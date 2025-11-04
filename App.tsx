import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { LightControl } from "./components/LightControl";
import { ThermostatControl } from "./components/ThermostatControl";
import { SecurityControl } from "./components/SecurityControl";
import { EnergyMonitor } from "./components/EnergyMonitor";
import { Home, Lightbulb, Thermometer, Shield, Zap, Moon, Sun } from "lucide-react";
import { Button } from "./components/ui/button";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Update localStorage and document class when theme changes
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Home className="w-8 h-8 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              <h1 className="text-slate-900 dark:text-slate-100">Smart Home Dashboard</h1>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
              className="rounded-full"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            Control and monitor your smart home devices
          </p>
        </header>

        {/* Main Dashboard */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8" aria-label="Device categories">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Home className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="lights" className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Lights</span>
            </TabsTrigger>
            <TabsTrigger value="climate" className="flex items-center gap-2">
              <Thermometer className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Climate</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="energy" className="flex items-center gap-2">
              <Zap className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Energy</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <section aria-labelledby="lights-section">
              <h2 id="lights-section" className="mb-4 text-slate-900 dark:text-slate-100">
                Lights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <LightControl
                  id="living-room-light"
                  name="Living Room"
                  room="Main Floor"
                  defaultOn={true}
                  defaultBrightness={75}
                />
                <LightControl
                  id="bedroom-light"
                  name="Bedroom"
                  room="Second Floor"
                  defaultOn={false}
                  defaultBrightness={50}
                />
                <LightControl
                  id="kitchen-light"
                  name="Kitchen"
                  room="Main Floor"
                  defaultOn={true}
                  defaultBrightness={100}
                />
              </div>
            </section>

            <section aria-labelledby="climate-section">
              <h2 id="climate-section" className="mb-4 text-slate-900 dark:text-slate-100">
                Climate Control
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ThermostatControl
                  id="main-thermostat"
                  name="Main Floor"
                  defaultTemp={72}
                  currentTemp={71}
                />
                <ThermostatControl
                  id="upstairs-thermostat"
                  name="Upstairs"
                  defaultTemp={68}
                  currentTemp={69}
                />
              </div>
            </section>

            <section aria-labelledby="security-section">
              <h2 id="security-section" className="mb-4 text-slate-900 dark:text-slate-100">
                Security
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <SecurityControl />
              </div>
            </section>
          </TabsContent>

          <TabsContent value="lights" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <LightControl
                id="living-room-light-tab"
                name="Living Room"
                room="Main Floor"
                defaultOn={true}
                defaultBrightness={75}
              />
              <LightControl
                id="bedroom-light-tab"
                name="Bedroom"
                room="Second Floor"
                defaultOn={false}
                defaultBrightness={50}
              />
              <LightControl
                id="kitchen-light-tab"
                name="Kitchen"
                room="Main Floor"
                defaultOn={true}
                defaultBrightness={100}
              />
              <LightControl
                id="bathroom-light"
                name="Bathroom"
                room="Second Floor"
                defaultOn={false}
                defaultBrightness={60}
              />
              <LightControl
                id="garage-light"
                name="Garage"
                room="Ground Floor"
                defaultOn={false}
                defaultBrightness={80}
              />
              <LightControl
                id="outdoor-light"
                name="Outdoor"
                room="Exterior"
                defaultOn={true}
                defaultBrightness={90}
              />
            </div>
          </TabsContent>

          <TabsContent value="climate" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ThermostatControl
                id="main-thermostat-tab"
                name="Main Floor"
                defaultTemp={72}
                currentTemp={71}
              />
              <ThermostatControl
                id="upstairs-thermostat-tab"
                name="Upstairs"
                defaultTemp={68}
                currentTemp={69}
              />
              <ThermostatControl
                id="basement-thermostat"
                name="Basement"
                defaultTemp={65}
                currentTemp={64}
              />
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <SecurityControl />
            </div>
          </TabsContent>

          <TabsContent value="energy" className="space-y-4">
            <EnergyMonitor />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
