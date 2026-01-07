import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { initDatabase, getAllContent, getContentById, ContentItem } from '@/lib/database';

interface DatabaseContextType {
  isLoading: boolean;
  isReady: boolean;
  content: ContentItem[];
  refreshContent: () => void;
  getContent: (id: number) => ContentItem | null;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export function DatabaseProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [content, setContent] = useState<ContentItem[]>([]);

  useEffect(() => {
    async function init() {
      try {
        await initDatabase();
        setContent(getAllContent());
        setIsReady(true);
      } catch (error) {
        console.error('Failed to initialize database:', error);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, []);

  const refreshContent = () => {
    setContent(getAllContent());
  };

  const getContent = (id: number): ContentItem | null => {
    return getContentById(id);
  };

  return (
    <DatabaseContext.Provider value={{ isLoading, isReady, content, refreshContent, getContent }}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
}
