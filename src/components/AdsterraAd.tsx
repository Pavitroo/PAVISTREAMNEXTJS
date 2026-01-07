import { useEffect, useRef } from "react";

const AdsterraAd = () => {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;

    const existingScript = document.querySelector(
      'script[src="https://pl28399247.effectivegatecpm.com/3d17d9d960726fe8281a1e765173b243/invoke.js"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "https://pl28399247.effectivegatecpm.com/3d17d9d960726fe8281a1e765173b243/invoke.js";
      script.async = true;
      script.setAttribute("data-cfasync", "false");

      document.body.appendChild(script);
    }

    scriptLoaded.current = true;
  }, []);

  return (
    <div className="w-full flex justify-center py-6">
      <div id="container-3d17d9d960726fe8281a1e765173b243" />
    </div>
  );
};

export default AdsterraAd;
