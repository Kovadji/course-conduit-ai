import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap, Battery, Lightbulb, Minus } from "lucide-react";
import { toast } from "sonner";

type Component = "battery" | "bulb" | "resistor" | "wire" | null;

interface CircuitSlot {
  id: number;
  component: Component;
  position: { x: number; y: number };
}

const ElectricCircuit = () => {
  const [selectedComponent, setSelectedComponent] = useState<Component>(null);
  const [circuit, setCircuit] = useState<CircuitSlot[]>([
    { id: 1, component: null, position: { x: 100, y: 100 } },
    { id: 2, component: null, position: { x: 300, y: 100 } },
    { id: 3, component: null, position: { x: 300, y: 300 } },
    { id: 4, component: null, position: { x: 100, y: 300 } },
  ]);
  const [isCircuitComplete, setIsCircuitComplete] = useState(false);
  const [voltage, setVoltage] = useState(0);
  const [current, setCurrent] = useState(0);

  const placeComponent = (slotId: number) => {
    if (!selectedComponent) {
      toast.error("Выберите компонент");
      return;
    }

    const updatedCircuit = circuit.map((slot) =>
      slot.id === slotId ? { ...slot, component: selectedComponent } : slot
    );

    setCircuit(updatedCircuit);
    setSelectedComponent(null);
    checkCircuit(updatedCircuit);
  };

  const checkCircuit = (currentCircuit: CircuitSlot[]) => {
    const hasBattery = currentCircuit.some((slot) => slot.component === "battery");
    const hasBulb = currentCircuit.some((slot) => slot.component === "bulb");
    const allSlotsFilled = currentCircuit.every((slot) => slot.component !== null);

    if (hasBattery && hasBulb && allSlotsFilled) {
      setIsCircuitComplete(true);
      setVoltage(12);
      setCurrent(0.5);
      toast.success("Цепь замкнута! Лампочка горит!");
    } else {
      setIsCircuitComplete(false);
      setVoltage(0);
      setCurrent(0);
    }
  };

  const resetCircuit = () => {
    setCircuit(circuit.map((slot) => ({ ...slot, component: null })));
    setIsCircuitComplete(false);
    setVoltage(0);
    setCurrent(0);
    toast.info("Цепь очищена");
  };

  const getComponentIcon = (component: Component) => {
    switch (component) {
      case "battery":
        return <Battery className="w-8 h-8" />;
      case "bulb":
        return <Lightbulb className={`w-8 h-8 ${isCircuitComplete ? "text-yellow-400 animate-pulse" : ""}`} />;
      case "resistor":
        return <Minus className="w-8 h-8" />;
      case "wire":
        return <div className="w-8 h-1 bg-foreground" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={selectedComponent === "battery" ? "default" : "outline"}
          onClick={() => setSelectedComponent("battery")}
          size="sm"
        >
          <Battery className="w-4 h-4 mr-2" />
          Батарея (12V)
        </Button>
        <Button
          variant={selectedComponent === "bulb" ? "default" : "outline"}
          onClick={() => setSelectedComponent("bulb")}
          size="sm"
        >
          <Lightbulb className="w-4 h-4 mr-2" />
          Лампочка
        </Button>
        <Button
          variant={selectedComponent === "resistor" ? "default" : "outline"}
          onClick={() => setSelectedComponent("resistor")}
          size="sm"
        >
          <Minus className="w-4 h-4 mr-2" />
          Резистор
        </Button>
        <Button
          variant={selectedComponent === "wire" ? "default" : "outline"}
          onClick={() => setSelectedComponent("wire")}
          size="sm"
        >
          <Zap className="w-4 h-4 mr-2" />
          Провод
        </Button>
        <Button variant="destructive" onClick={resetCircuit} size="sm">
          Очистить
        </Button>
      </div>

      <Card className="p-6 bg-muted/20">
        <div className="relative w-full aspect-square max-w-md mx-auto">
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
            {/* Top line */}
            <line x1="20%" y1="20%" x2="80%" y2="20%" stroke="currentColor" strokeWidth="2" />
            {/* Right line */}
            <line x1="80%" y1="20%" x2="80%" y2="80%" stroke="currentColor" strokeWidth="2" />
            {/* Bottom line */}
            <line x1="80%" y1="80%" x2="20%" y2="80%" stroke="currentColor" strokeWidth="2" />
            {/* Left line */}
            <line x1="20%" y1="80%" x2="20%" y2="20%" stroke="currentColor" strokeWidth="2" />
            
            {isCircuitComplete && (
              <>
                {/* Animated electrons */}
                <circle r="4" fill="currentColor" className="text-primary">
                  <animateMotion dur="2s" repeatCount="indefinite">
                    <mpath href="#circuit-path" />
                  </animateMotion>
                </circle>
                <path id="circuit-path" d="M 20,20 L 80,20 L 80,80 L 20,80 Z" fill="none" />
              </>
            )}
          </svg>

          {circuit.map((slot) => (
            <button
              key={slot.id}
              onClick={() => placeComponent(slot.id)}
              className="absolute w-16 h-16 bg-background border-2 border-border rounded-lg flex items-center justify-center hover:bg-accent transition-colors"
              style={{
                left: `${slot.position.x}px`,
                top: `${slot.position.y}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {slot.component ? (
                getComponentIcon(slot.component)
              ) : (
                <span className="text-xs text-muted-foreground">{slot.id}</span>
              )}
            </button>
          ))}
        </div>
      </Card>

      {isCircuitComplete && (
        <Card className="p-4 bg-green-500/10 border-green-500/20">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Напряжение</div>
              <div className="text-lg font-semibold">{voltage}V</div>
            </div>
            <div>
              <div className="text-muted-foreground">Сила тока</div>
              <div className="text-lg font-semibold">{current}A</div>
            </div>
          </div>
        </Card>
      )}

      <div className="text-xs text-muted-foreground">
        <p>Соберите электрическую цепь:</p>
        <ol className="list-decimal list-inside space-y-1 mt-2">
          <li>Выберите компонент из панели инструментов</li>
          <li>Нажмите на позицию в цепи, чтобы разместить компонент</li>
          <li>Для работы цепи нужны: батарея, лампочка и провода</li>
          <li>Замкните цепь, чтобы зажечь лампочку</li>
        </ol>
      </div>
    </div>
  );
};

export default ElectricCircuit;
