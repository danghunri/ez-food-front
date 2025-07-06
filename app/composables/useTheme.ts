import { useTheme as useVuetifyTheme } from "vuetify";

export const useTheme = () => {
  const vuetifyTheme = useVuetifyTheme();
  
  // Theme names
  const lightTheme = "myCustomLightTheme";
  const darkTheme = "myCustomDarkTheme";
  
  // Initialize theme state - get from localStorage on client side
  const isDark = ref(false);
  
  // Initialize theme on client side
  const initializeTheme = () => {
    if (process.client) {
      // Get saved theme from localStorage or default to light
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        isDark.value = savedTheme === "dark";
        // Apply the theme immediately
        vuetifyTheme.global.name.value = isDark.value ? darkTheme : lightTheme;
      }
    }
  };
  
  // Toggle theme function
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    const newTheme = isDark.value ? darkTheme : lightTheme;
    vuetifyTheme.global.name.value = newTheme;
    
    // Save to localStorage
    if (process.client) {
      localStorage.setItem("theme", isDark.value ? "dark" : "light");
    }
  };
  
  // Set specific theme
  const setTheme = (theme: "light" | "dark") => {
    isDark.value = theme === "dark";
    const newTheme = isDark.value ? darkTheme : lightTheme;
    vuetifyTheme.global.name.value = newTheme;
    
    // Save to localStorage
    if (process.client) {
      localStorage.setItem("theme", theme);
    }
  };
  
  // Initialize theme when composable is used
  onMounted(() => {
    initializeTheme();
  });
  
  // Also initialize immediately if we're on client side
  if (process.client) {
    initializeTheme();
  }
  
  return {
    isDark: readonly(isDark),
    toggleTheme,
    setTheme,
  };
};