import initSqlJs, { Database } from 'sql.js';

export interface Episode {
  id: number;
  content_id: number;
  episode_number: number;
  title: string;
  url: string;
}

export interface CastMember {
  id: number;
  content_id: number;
  name: string;
  role: string;
}

export interface CrewMember {
  id: number;
  content_id: number;
  name: string;
  role: string;
}

export interface ContentItem {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: string;
  poster_url: string;
  banner_url: string;
  type: 'movie' | 'series';
  duration: string;
  overview: string;
  streaming_url: string;
  episodes?: Episode[];
  cast?: CastMember[];
  crew?: CrewMember[];
}

let db: Database | null = null;

const DB_STORAGE_KEY = 'pavi_movies_db';

export async function initDatabase(): Promise<Database> {
  if (db) return db;

  const SQL = await initSqlJs({
    locateFile: file => `https://sql.js.org/dist/${file}`
  });

  // Try to load from localStorage
  const savedDb = localStorage.getItem(DB_STORAGE_KEY);
  if (savedDb) {
    const uint8Array = new Uint8Array(JSON.parse(savedDb));
    db = new SQL.Database(uint8Array);
  } else {
    db = new SQL.Database();
    createTables(db);
    await seedInitialData(db);
  }

  return db;
}

function createTables(database: Database) {
  database.run(`
    CREATE TABLE IF NOT EXISTS content (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      year INTEGER,
      genre TEXT,
      rating TEXT,
      poster_url TEXT,
      banner_url TEXT,
      type TEXT CHECK(type IN ('movie', 'series')) NOT NULL,
      duration TEXT,
      overview TEXT,
      streaming_url TEXT
    )
  `);

  database.run(`
    CREATE TABLE IF NOT EXISTS episodes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content_id INTEGER NOT NULL,
      episode_number INTEGER NOT NULL,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      FOREIGN KEY (content_id) REFERENCES content(id) ON DELETE CASCADE
    )
  `);

  database.run(`
    CREATE TABLE IF NOT EXISTS cast_members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      role TEXT,
      FOREIGN KEY (content_id) REFERENCES content(id) ON DELETE CASCADE
    )
  `);

  database.run(`
    CREATE TABLE IF NOT EXISTS crew_members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      role TEXT,
      FOREIGN KEY (content_id) REFERENCES content(id) ON DELETE CASCADE
    )
  `);
}

async function seedInitialData(database: Database) {
  // Seed Dhurandhar
  database.run(`
    INSERT INTO content (title, year, genre, rating, poster_url, banner_url, type, duration, overview, streaming_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    'Dhurandhar',
    2025,
    'Action/Adventure',
    '8.6',
    '/src/assets/dhurandhar-banner.webp',
    '/src/assets/dhurandhar-banner.webp',
    'movie',
    '3h 34m',
    'A mysterious traveler slips into the heart of Karachi\'s underbelly and rises through its ranks with lethal precision, only to tear the notorious network apart from within. Dhurandhar is a 2025 Indian Hindi-language spy action thriller film written, co-produced and directed by Aditya Dhar, starring Ranveer Singh, Akshaye Khanna, Sanjay Dutt, R. Madhavan, and Arjun Rampal.',
    'https://drive.google.com/file/d/1FPF1jblO-w-MFxiLjWJ26wsXZtubbRfh/preview'
  ]);

  // Add Dhurandhar cast
  const dhurandharCast = [
    ['Sara Arjun', 'Yalina Jamali'],
    ['Akshaye Khanna', 'Rehman Dakait'],
    ['Ranveer Singh', 'Hamza Ali Mazari, Jaskirat Singh'],
    ['Arjun Rampal', 'Major Iqbal'],
    ['Sanjay Dutt', 'SP Chaudhary Aslam'],
    ['R. Madhavan', 'Ajay Sanyal'],
    ['Rakesh Bedi', 'Jameel Jamali'],
    ['Manav Gohil', 'Sushant Bansal'],
    ['Saumya Tandon', 'Ulfat Hasin']
  ];

  for (const [name, role] of dhurandharCast) {
    database.run('INSERT INTO cast_members (content_id, name, role) VALUES (1, ?, ?)', [name, role]);
  }

  // Add Dhurandhar crew
  const dhurandharCrew = [
    ['Aditya Dhar', 'Director'],
    ['Aditya Dhar', 'Writer'],
    ['Jyoti Deshpande', 'Producer'],
    ['Lokesh Dhar', 'Producer'],
    ['Shashwat Sachdev', 'Music Director'],
    ['Shivkumar V. Panicker', 'Editor']
  ];

  for (const [name, role] of dhurandharCrew) {
    database.run('INSERT INTO crew_members (content_id, name, role) VALUES (1, ?, ?)', [name, role]);
  }

  // Seed Doraemon
  database.run(`
    INSERT INTO content (title, year, genre, rating, poster_url, banner_url, type, duration, overview, streaming_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    'Doraemon',
    2005,
    'Animation/Comedy/Family',
    '8.5',
    '/src/assets/doraemon-poster.jfif',
    '/src/assets/doraemon-poster.jfif',
    'series',
    '24m per episode',
    'Doraemon is a robotic cat who travels back in time from the 22nd century to help a schoolboy named Nobita. The series follows their adventures as Doraemon uses his amazing gadgets from his fourth-dimensional pocket to help Nobita with his everyday problems, though things often go hilariously wrong.',
    ''
  ]);

  // Doraemon episode URLs
  const doraemonUrls = [
    'https://drive.google.com/file/d/14zissxpoWrS5Ldg-hqhyVH5lO8g64LQD/preview',
    'https://drive.google.com/file/d/1isJ-63ifCSX2gnk-A0kAwzmIjt7gP2nN/preview',
    'https://drive.google.com/file/d/1fmf8l3ul3CC24__SFXi1wFS6IPhNUIia/preview',
    'https://drive.google.com/file/d/1oMVTEPjUY4HBpOJsGKHQKsR8nVcD7LGQ/preview',
    'https://drive.google.com/file/d/1p_2mnQT1bGKpWklN4A0JUyc7rvEXVq0A/preview',
    'https://drive.google.com/file/d/1LDN6oG5ZBLe8-VgqSel0110JESWYvupe/preview',
    'https://drive.google.com/file/d/1m4yt9Xf5FMy06b0DJE33NR0mOOE-K8LG/preview',
    'https://drive.google.com/file/d/19XYdx1Qo-ngGEZDQfe3290GGc91D9Hgh/preview',
    'https://drive.google.com/file/d/1sur9_uPK34nHY84eTBHJVEyVmKIey8UM/preview',
    'https://drive.google.com/file/d/1V8EkD3HI5ySeyyH4FbsdiYuLuu_CRwYs/preview',
    'https://drive.google.com/file/d/1aivG3Kypn_cW1aNmfnwDu38zISGdSGCR/preview',
    'https://drive.google.com/file/d/1EHOlfZYLMqYvvZu2yz2ulmd7O2Vc-vWh/preview',
    'https://drive.google.com/file/d/1WdltmOHigSJZpR0xU_nNOCzwDy-acskO/preview',
    'https://drive.google.com/file/d/1T5Uwiff4a7oV64QILlJdrGrmraconU2w/preview',
    'https://drive.google.com/file/d/1tTbiMiuowdpSg7zdHU22Mporp3y7-is7/preview',
    'https://drive.google.com/file/d/1Sye2K9VNYmkAHUaIVRMFuLK21LmgGvVx/preview',
    'https://drive.google.com/file/d/1X6uCkcEEC8uRhwmFvSgXYkTrLkFLQEVl/preview',
    'https://drive.google.com/file/d/1jL2J9-bzbTNAqmW4QwhS4UfwOBttWc7s/preview',
    'https://drive.google.com/file/d/1ijLM9IHNIDn7Pk5FukGjkqrir1p_zmJe/preview',
    'https://drive.google.com/file/d/1iQQZzLbIE3QZkqrRRRodoEi-wofKKE5t/preview',
    'https://drive.google.com/file/d/1-Be0JMGeNj5Qnsl_mHQIorONemERTyDn/preview',
    'https://drive.google.com/file/d/1fDkhlBxcj9FeBd-ImW_NeWjL5dDtMIra/preview',
    'https://drive.google.com/file/d/1-Y2sBuN5eNjV_62dMn5LvNyqrdaTlHNT/preview',
    'https://drive.google.com/file/d/19TPWXPjOUZLIxNqt73bfPmsQ55rwStDH/preview',
    'https://drive.google.com/file/d/1ql0FsWxgMcqzxVUqYWe8l66lKBPDcZc4/preview',
    'https://drive.google.com/file/d/1qLUqpsYWEL629ILZ1q2KhmBwVfUIbU4Q/preview',
    'https://drive.google.com/file/d/1QIYNXeEb88qhV4IxRcgoJKjqv0ne3UXn/preview',
    'https://drive.google.com/file/d/13dhYeH85RC50aJcq2i6bKdeA1wyqh2V1/preview',
    'https://drive.google.com/file/d/1D4dWw3sKg53sFKfoIhoRGh9mlkwyUqr6/preview',
    'https://drive.google.com/file/d/1RECRYCls0U3gAg5RDJ3RYmTxCQ5jbEJC/preview',
    'https://drive.google.com/file/d/1ldRprrQ1LwM1_njQwAa6NZbSV3PjT1AR/preview',
    'https://drive.google.com/file/d/16E8YpUaANbsCXKIrV9N0RtIvKabsmYKn/preview',
    'https://drive.google.com/file/d/1dAIhKu3cjbtzz-nfhalwHpH2FVPnD7dt/preview',
    'https://drive.google.com/file/d/1wlBGxth64_5S3CVxwPk_aEUOQGlFgRnj/preview',
    'https://drive.google.com/file/d/1z4rvhNAxCVDIoec8xL4fxObh-7ntbu4e/preview',
    'https://drive.google.com/file/d/1vDMraqJ2Zxhk0lT2tOJ6wgzj7bnTOccX/preview',
    'https://drive.google.com/file/d/1eMofniOJVZA2y_E52Z2KkkShQMwWjAiO/preview',
    'https://drive.google.com/file/d/1BJsTtgbG7EL5TSz0Dj_rk97lZwSQO7ol/preview',
    'https://drive.google.com/file/d/1bqf0QgtcjR39nwbW-u8c8SzIL6uvGQQa/preview',
    'https://drive.google.com/file/d/1uvnZWxo1rsQ5E9d2Rq6zxYl4omjHETGm/preview',
    'https://drive.google.com/file/d/1n53wcpSjFHRAPOS5E14MZRo6iPBZYn8c/preview',
    'https://drive.google.com/file/d/1AVz6Ezy5t1a2XsX-gFVOW2Xtb6pgZ-sI/preview',
    'https://drive.google.com/file/d/1idpcbkIpC0yweD72iw-kIz2_zjx0FXrm/preview',
    'https://drive.google.com/file/d/1NT0G58_Ds3XHJBZ20cvEuSSy09lo8dPL/preview',
    'https://drive.google.com/file/d/1NkKT7F23lneQSp1OQD5AJ_iUgYOpne9k/preview',
    'https://drive.google.com/file/d/19PucsciFG6_lV00774qu1N9WRg7xXBFH/preview',
    'https://drive.google.com/file/d/1AulIpwaZ2WT01eAQ_I9irIWyHfdS4-B_/preview',
    'https://drive.google.com/file/d/1PDJuT4zbHP2u5OcxPXpcQj2XFfVzUoJm/preview',
    'https://drive.google.com/file/d/1KTOobuZoo2qO5HzKe-4qfWvQXkGtBXB6/preview',
    'https://drive.google.com/file/d/1DTciz-vlvKIhLQVn_l8qDMCZOeIrgOQb/preview',
    'https://drive.google.com/file/d/1lr3gIs6HclWJkCbS9aDEGQfoZqj_WBt4/preview',
    'https://drive.google.com/file/d/1KnUdjRAnGIsHKQabWzD2pOUDHx3bMWY9/preview',
    'https://drive.google.com/file/d/1f0zuFX6bFgBigONW_qCSfuqJn7LAq3H5/preview',
    'https://drive.google.com/file/d/1Z9BvG69rtdf0I-IDW6a35fbpUhdo_EQ-/preview',
    'https://drive.google.com/file/d/1pdED4KBtRuLhc32skJRkgTswPC9W2VIQ/preview',
    'https://drive.google.com/file/d/1WGln4MeHXqSuk5H6UtiOuaUZhYN0ywhQ/preview',
    'https://drive.google.com/file/d/1X8_mKawWyaLdfZxW3dbcE9BBAcfyk8ku/preview',
    'https://drive.google.com/file/d/1kz-vaVXQhIByJ3CCVSJCzug2QRSdYr8s/preview',
    'https://drive.google.com/file/d/1Ce1ibU-9fCIs-nPBUq7S0_y7dR71vQeg/preview',
    'https://drive.google.com/file/d/1bY7ObEPHAEULUwm57xYt3PVPhcKUtHCU/preview',
    'https://drive.google.com/file/d/1EV-8dgVtRYmL6fKsK_hH3gMlsrdh7FA-/preview',
    'https://drive.google.com/file/d/1eEHTHgVkIB5R_2fqjegSxM3Tbtk7iLXf/preview',
    'https://drive.google.com/file/d/17f3Ao4Ucs57V8W-zt_Vk_XnDVAg8HiU2/preview',
    'https://drive.google.com/file/d/1Su1KerO4nFUJ8UYUB4pPVcNZ5klcfTTD/preview',
    'https://drive.google.com/file/d/1_DH-80mMO4SMWK6mWnPnnsu8olD-6nnm/preview',
    'https://drive.google.com/file/d/1ux--IYEuqgd2CI-cDuU75j6nFT1k5ZL5/preview',
    'https://drive.google.com/file/d/10U1p_1gB3UL7gD2JDufN2I4BilVO-Wdv/preview',
    'https://drive.google.com/file/d/1lV1zK60eiQsdSU1_vkAPZvZktqUaXQhQ/preview',
    'https://drive.google.com/file/d/11d5aGNTModjVv8AxhZ65ZMeiW6R-nO0O/preview',
    'https://drive.google.com/file/d/1LiHrmaKMsr0EYHGW6348_mOL4tHQKtXM/preview',
    'https://drive.google.com/file/d/16CQ4DlOi1IgyCUWTXFxq37pDJWcYYz6s/preview',
    'https://drive.google.com/file/d/1hNufYxHie5BigMil48kK7O8nQWEWYx84/preview',
    'https://drive.google.com/file/d/1eEe3JbHC67wvTuWwdrw7vRGgIFKx6lOo/preview',
    'https://drive.google.com/file/d/1cglHk8TTusjTYjJ1RMTAxPiEEpuAXWpH/preview',
    'https://drive.google.com/file/d/1u0ysDSZvS-fIaBFqqy_r-3eeG5jfSTL6/preview',
    'https://drive.google.com/file/d/1-yQm0Qqy4uyPQdyY4KGJgxbE4U0V_xc8/preview',
    'https://drive.google.com/file/d/17P4Lc1J7MggvK4zDGGl_XLgakurOpZXp/preview',
    'https://drive.google.com/file/d/1SnmICaOd8n68xinU-J97s5B-WLz7mbr8/preview',
    'https://drive.google.com/file/d/1CbX0OZZwEMrsWBnFs63EPeVsGVlmqx_L/preview',
    'https://drive.google.com/file/d/1giBZ9B9KKgjlCVGTdTbj7oboTTOKqRq5/preview',
    'https://drive.google.com/file/d/1kdvhoG8611drpALZ-GpFhV9y7p1fyOpT/preview',
    'https://drive.google.com/file/d/1i1jHIDa9vOepQJLVp_YoyJ_S1Sd5ALV0/preview',
    'https://drive.google.com/file/d/1ySB5ic13fC4chXJI2NUWQrcdLhXSl-44/preview',
    'https://drive.google.com/file/d/1TaYL2ZxpWcwr_N_QGlJABuiWC6doX1My/preview',
    'https://drive.google.com/file/d/1-V4MV6jgxQFQaTpCh-rikDjrO4j2bgNU/preview',
    'https://drive.google.com/file/d/1Vd3OwRzc5ah832YYrh_BaD-JjZCXSea6/preview',
    'https://drive.google.com/file/d/1AulAr_6J1hko47H6Ek_AvKi0RD5ZjVdq/preview',
    'https://drive.google.com/file/d/1PsiHi2-aesk2k1NtKJoY_joQtTr5yT-U/preview',
    'https://drive.google.com/file/d/1azHBxPyRfS89__bFKeelJaxY_yDZOvGK/preview',
    'https://drive.google.com/file/d/1o1tUXwMWNnRfmeWhsiZe-OPJ7mUc9YFS/preview',
    'https://drive.google.com/file/d/1EtnUzk5r3yU28F2_bFMGBQCBSauI9iQi/preview',
    'https://drive.google.com/file/d/1rh72RIGehdfwjdrRjYkhxjpuyD0y_6Ys/preview',
    'https://drive.google.com/file/d/1rVcjFIajeI7w_B2Od0ykCRwBXVmMnyoT/preview',
    'https://drive.google.com/file/d/1qPsntSW4PxjXAWQ1F8hMA9bqR0QZqhOl/preview',
    'https://drive.google.com/file/d/1lLcpwt1UW73Y2ZsnF2HCwImetP8saRDg/preview',
    'https://drive.google.com/file/d/1P4V-FzYjYIvVZPZx6l_OCEK0MRtJGRuv/preview',
    'https://drive.google.com/file/d/14pOY62-N-YUMKrzxFtjhUOeMbpHEb49F/preview',
    'https://drive.google.com/file/d/1941AOKAFyuofiDx1Kwn9F8UKp9dJMyKm/preview',
    'https://drive.google.com/file/d/1-DjhoGvFOSTAP72vR5F7CHtCYsrHk3lI/preview',
    'https://drive.google.com/file/d/1EdwIt60Ec0BPk_bR5r9AkGkDwmMiewIk/preview',
    'https://drive.google.com/file/d/1ogxEbSDcN7_EOVtC_HNjom0CfqeMMeDJ/preview',
    'https://drive.google.com/file/d/1Xn-QHh-EYXuWNMxU1PsjwOKfx9kYTdoX/preview',
    'https://drive.google.com/file/d/1OYJKcAgAAMalZGVLLTUicf8z3Kpj9l51/preview',
    'https://drive.google.com/file/d/1CkAqrDquQ5Kp4_zD2cZh1tZsgXOg-66F/preview',
    'https://drive.google.com/file/d/15Eug-Ik0vc_qEq06sKp5FZF2F8a3akC_/preview',
    'https://drive.google.com/file/d/1AToOq1mNoyYRR5tTwKsnODYmeaad_1P-/preview',
    'https://drive.google.com/file/d/1ssRPDhRhN4xoALG0gauwwDA5M5ZD-Z3i/preview',
    'https://drive.google.com/file/d/1kSB3B2roniuJ-kzTB9N6wL677Yku4Oyq/preview',
    'https://drive.google.com/file/d/1hAAEiBh6oV4FwIsL-9rrIedW89uvMjSu/preview',
    'https://drive.google.com/file/d/1iVXck_Y-XHPh63ysEQIOGE28kBLR-eCD/preview',
    'https://drive.google.com/file/d/1L2eo7NWB8uziQNCYPN7wg9Ddzs1ivykz/preview',
    'https://drive.google.com/file/d/1JFHRgbh5jGNj6MqFQk0R7wngNC0BRq8N/preview',
    'https://drive.google.com/file/d/1K8D8hZVeCTGrpfrh_ptmVjjSm87i08sd/preview',
    'https://drive.google.com/file/d/1l8Bhn_ws9aGY4eCLi7oOKYEGws_etvv-/preview',
    'https://drive.google.com/file/d/1_6EslX0m5AhZ6qW8aftjhbEJy0-RrrEe/preview',
    'https://drive.google.com/file/d/1Q2XQFVKOAPprSbaMX7S23JPcZ0BPdaZE/preview',
    'https://drive.google.com/file/d/1pZVINusBRZ_Dw5ao65kff4Cp98Gpofq1/preview',
    'https://drive.google.com/file/d/1ZW4X548iQS2gRVx75zMyi_BimAt8p8RU/preview',
    'https://drive.google.com/file/d/1y_61iRA-79EvonTYGLg_HeKOBnJBWQh2/preview',
    'https://drive.google.com/file/d/1e5JRLbhS-9PJLUsS4OZGGxdFDZ0nxkNq/preview',
    'https://drive.google.com/file/d/1EWlHiM5MHHyfKxxdd9BlEJ8mMpoEcj2K/preview',
    'https://drive.google.com/file/d/1Qz6MJtwf3_lLLg_hP1Q07RAYdyolxso8/preview',
    'https://drive.google.com/file/d/1-Gs_JVx2AkGoDORkD4fbS7FTYdcaak3j/preview',
    'https://drive.google.com/file/d/1UTnqgXc8q-akoUtzLxPbi5kXkMJRVSvb/preview',
    'https://drive.google.com/file/d/19FCEgw8igPxUAAOT1ZHQ5yqT026SG4f2/preview',
    'https://drive.google.com/file/d/191gy6bQIAnTJPEcnYShWO_vPshBD_9vn/preview',
    'https://drive.google.com/file/d/1em_spLQ-crCYHfnHrz18YfERQGqmlppk/preview',
    'https://drive.google.com/file/d/1L1Qa_IM7h3Lzh6MGSIEIbDqo31r0wHkO/preview',
    'https://drive.google.com/file/d/195ILSXtLdO4cqEVGt2qcfRLRWHAZ3E_g/preview',
    'https://drive.google.com/file/d/1c-0ruWrhOW0VQVu2_QhkEeQuZmfccigk/preview',
    'https://drive.google.com/file/d/16rdaCNxwFGRNBzrAyD9lQKE7EsvLQnc9/preview',
    'https://drive.google.com/file/d/1xcbY2m6LfqAsyc_dvcjxZr9pNDApGesF/preview',
    'https://drive.google.com/file/d/1PCr-ItjiI-ZY5en92xIYWQG9jCvdteKv/preview',
    'https://drive.google.com/file/d/1IkldZGi8chY-319xKGyh3zStM9WGtOX6/preview',
    'https://drive.google.com/file/d/1CxAHpYmhTCcPGvDR70sQTCkADTPBXsJJ/preview',
    'https://drive.google.com/file/d/1dMUjUEWJKHPHSNpYoz81RujGbhMSm3um/preview',
    'https://drive.google.com/file/d/1B1Fy897ZtvnFtcrB6Xr5WosP1z4oyYmK/preview',
    'https://drive.google.com/file/d/1zHQqzVgh8Hfb1rzeaemIt7aQkkY9bq3I/preview',
    'https://drive.google.com/file/d/1rd7RhgeX39ExWCcWvX5C553tq9se7sv0/preview',
    'https://drive.google.com/file/d/1SedbAUvRfPrWs84QdyaWYhm7MMKcJvUG/preview',
    'https://drive.google.com/file/d/1Q1zXqbzglBu9N_9-baBm1ro4yn_wDCg0/preview',
    'https://drive.google.com/file/d/1DtUUEzx3785ckaKJh7IkHZ76WYhvqewI/preview',
    'https://drive.google.com/file/d/1han3ZF00Bn94dvALCkDRGot4ZsT5-Blx/preview',
    'https://drive.google.com/file/d/1xWP1dbesRLXT_J36y3CkBi9dtdLDdflA/preview',
    'https://drive.google.com/file/d/1pU4e6GTlOCjkB2v3ECo9nya_7vTJj0ha/preview',
    'https://drive.google.com/file/d/1qIwoGZ5fH8L5c-HUNrrjgfBnqT4swOdV/preview',
    'https://drive.google.com/file/d/1QDJT_k9Rc7557B4pDgV-3m23xNxANwu0/preview',
    'https://drive.google.com/file/d/1Rt0r8BBDsmM-K_rZbYpvGlsPXsruFbVl/preview',
    'https://drive.google.com/file/d/1pG8DyU6tuzC0tp6DVcNpC2yshRQ7PnrU/preview',
    'https://drive.google.com/file/d/1jAqgRFLB0mGWNKb33yoomvTCkwk2Evfx/preview'
  ];

  // Insert 150 episodes (reuse URLs cyclically if needed)
  for (let i = 0; i < 150; i++) {
    const url = doraemonUrls[i % doraemonUrls.length];
    database.run(
      'INSERT INTO episodes (content_id, episode_number, title, url) VALUES (2, ?, ?, ?)',
      [i + 1, `Episode ${i + 1}`, url]
    );
  }

  // Add Doraemon cast
  const doraemonCast = [
    ['Wasabi Mizuta', 'Doraemon (voice)'],
    ['Megumi Ohara', 'Nobita Nobi (voice)'],
    ['Yumi Kakazu', 'Shizuka Minamoto (voice)'],
    ['Subaru Kimura', 'Takeshi Goda (voice)'],
    ['Tomokazu Seki', 'Suneo Honekawa (voice)']
  ];

  for (const [name, role] of doraemonCast) {
    database.run('INSERT INTO cast_members (content_id, name, role) VALUES (2, ?, ?)', [name, role]);
  }

  saveDatabase();
}

export function saveDatabase() {
  if (!db) return;
  const data = db.export();
  const arr = Array.from(data);
  localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(arr));
}

export function getAllContent(): ContentItem[] {
  if (!db) return [];
  
  const results = db.exec('SELECT * FROM content');
  if (!results.length) return [];
  
  const columns = results[0].columns;
  return results[0].values.map(row => {
    const item: any = {};
    columns.forEach((col, i) => {
      item[col] = row[i];
    });
    return item as ContentItem;
  });
}

export function getContentById(id: number): ContentItem | null {
  if (!db) return null;

  const contentResult = db.exec('SELECT * FROM content WHERE id = ?', [id]);
  if (!contentResult.length || !contentResult[0].values.length) return null;

  const columns = contentResult[0].columns;
  const row = contentResult[0].values[0];
  const content: any = {};
  columns.forEach((col, i) => {
    content[col] = row[i];
  });

  // Get episodes
  const episodesResult = db.exec(
    'SELECT * FROM episodes WHERE content_id = ? ORDER BY episode_number',
    [id]
  );
  if (episodesResult.length && episodesResult[0].values.length) {
    const epColumns = episodesResult[0].columns;
    content.episodes = episodesResult[0].values.map(epRow => {
      const ep: any = {};
      epColumns.forEach((col, i) => {
        ep[col] = epRow[i];
      });
      return ep;
    });
  }

  // Get cast
  const castResult = db.exec('SELECT * FROM cast_members WHERE content_id = ?', [id]);
  if (castResult.length && castResult[0].values.length) {
    const castColumns = castResult[0].columns;
    content.cast = castResult[0].values.map(castRow => {
      const cast: any = {};
      castColumns.forEach((col, i) => {
        cast[col] = castRow[i];
      });
      return cast;
    });
  }

  // Get crew
  const crewResult = db.exec('SELECT * FROM crew_members WHERE content_id = ?', [id]);
  if (crewResult.length && crewResult[0].values.length) {
    const crewColumns = crewResult[0].columns;
    content.crew = crewResult[0].values.map(crewRow => {
      const crew: any = {};
      crewColumns.forEach((col, i) => {
        crew[col] = crewRow[i];
      });
      return crew;
    });
  }

  return content as ContentItem;
}

export function addContent(content: Omit<ContentItem, 'id' | 'episodes' | 'cast' | 'crew'>): number {
  if (!db) return -1;

  db.run(`
    INSERT INTO content (title, year, genre, rating, poster_url, banner_url, type, duration, overview, streaming_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    content.title,
    content.year,
    content.genre,
    content.rating,
    content.poster_url,
    content.banner_url,
    content.type,
    content.duration,
    content.overview,
    content.streaming_url
  ]);

  const result = db.exec('SELECT last_insert_rowid()');
  const id = result[0].values[0][0] as number;
  saveDatabase();
  return id;
}

export function updateContent(id: number, content: Partial<ContentItem>) {
  if (!db) return;

  const fields: string[] = [];
  const values: any[] = [];

  Object.entries(content).forEach(([key, value]) => {
    if (key !== 'id' && key !== 'episodes' && key !== 'cast' && key !== 'crew') {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  });

  if (fields.length) {
    values.push(id);
    db.run(`UPDATE content SET ${fields.join(', ')} WHERE id = ?`, values);
    saveDatabase();
  }
}

export function deleteContent(id: number) {
  if (!db) return;
  db.run('DELETE FROM episodes WHERE content_id = ?', [id]);
  db.run('DELETE FROM cast_members WHERE content_id = ?', [id]);
  db.run('DELETE FROM crew_members WHERE content_id = ?', [id]);
  db.run('DELETE FROM content WHERE id = ?', [id]);
  saveDatabase();
}

export function addEpisode(contentId: number, episodeNumber: number, title: string, url: string): number {
  if (!db) return -1;

  db.run(
    'INSERT INTO episodes (content_id, episode_number, title, url) VALUES (?, ?, ?, ?)',
    [contentId, episodeNumber, title, url]
  );

  const result = db.exec('SELECT last_insert_rowid()');
  const id = result[0].values[0][0] as number;
  saveDatabase();
  return id;
}

export function updateEpisode(id: number, title: string, url: string) {
  if (!db) return;
  db.run('UPDATE episodes SET title = ?, url = ? WHERE id = ?', [title, url, id]);
  saveDatabase();
}

export function deleteEpisode(id: number) {
  if (!db) return;
  db.run('DELETE FROM episodes WHERE id = ?', [id]);
  saveDatabase();
}

export function addCastMember(contentId: number, name: string, role: string): number {
  if (!db) return -1;
  db.run('INSERT INTO cast_members (content_id, name, role) VALUES (?, ?, ?)', [contentId, name, role]);
  const result = db.exec('SELECT last_insert_rowid()');
  const id = result[0].values[0][0] as number;
  saveDatabase();
  return id;
}

export function addCrewMember(contentId: number, name: string, role: string): number {
  if (!db) return -1;
  db.run('INSERT INTO crew_members (content_id, name, role) VALUES (?, ?, ?)', [contentId, name, role]);
  const result = db.exec('SELECT last_insert_rowid()');
  const id = result[0].values[0][0] as number;
  saveDatabase();
  return id;
}

export function exportDatabase(): Uint8Array | null {
  if (!db) return null;
  return db.export();
}

export function resetDatabase() {
  localStorage.removeItem(DB_STORAGE_KEY);
  db = null;
}
