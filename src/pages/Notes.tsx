import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, PencilBrush } from "fabric";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Type, Pencil, Eraser, Trash2, Download } from "lucide-react";

const Notes = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeTab, setActiveTab] = useState<"text" | "draw">("text");
  const [textNote, setTextNote] = useState("");
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushWidth, setBrushWidth] = useState(2);
  const [isEraser, setIsEraser] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || fabricCanvas) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: window.innerWidth > 1024 ? 1200 : 800,
      height: window.innerHeight - 300,
      backgroundColor: "#ffffff",
      isDrawingMode: true,
    });

    const brush = new PencilBrush(canvas);
    brush.color = brushColor;
    brush.width = brushWidth;
    canvas.freeDrawingBrush = brush;

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;
    
    const brush = fabricCanvas.freeDrawingBrush;
    if (brush) {
      brush.color = isEraser ? "#ffffff" : brushColor;
      brush.width = isEraser ? 20 : brushWidth;
    }
  }, [fabricCanvas, brushColor, brushWidth, isEraser]);

  useEffect(() => {
    if (!fabricCanvas) return;
    fabricCanvas.isDrawingMode = activeTab === "draw";
  }, [fabricCanvas, activeTab]);

  const handleClearCanvas = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    fabricCanvas.renderAll();
  };

  const handleDownloadCanvas = () => {
    if (!fabricCanvas) return;
    const dataURL = fabricCanvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 1,
    });
    const link = document.createElement('a');
    link.download = 'note.png';
    link.href = dataURL;
    link.click();
  };

  const handleDownloadText = () => {
    const blob = new Blob([textNote], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'note.txt';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Заметки</h1>
        <p className="text-muted-foreground">
          Создавайте текстовые заметки или рисуйте от руки
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "text" | "draw")}>
        <TabsList className="mb-4">
          <TabsTrigger value="text">
            <Type className="w-4 h-4 mr-2" />
            Текст
          </TabsTrigger>
          <TabsTrigger value="draw">
            <Pencil className="w-4 h-4 mr-2" />
            Рисование
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <Textarea
                  placeholder="Начните писать вашу заметку..."
                  value={textNote}
                  onChange={(e) => setTextNote(e.target.value)}
                  className="min-h-[600px] resize-none"
                />
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setTextNote("")}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Очистить
                  </Button>
                  <Button onClick={handleDownloadText}>
                    <Download className="w-4 h-4 mr-2" />
                    Скачать
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="draw">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
            <div>
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div>
                    <Label className="mb-3 block">Инструменты</Label>
                    <div className="space-y-2">
                      <Button
                        variant={!isEraser ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => setIsEraser(false)}
                      >
                        <Pencil className="w-4 h-4 mr-2" />
                        Карандаш
                      </Button>
                      <Button
                        variant={isEraser ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => setIsEraser(true)}
                      >
                        <Eraser className="w-4 h-4 mr-2" />
                        Ластик
                      </Button>
                    </div>
                  </div>

                  {!isEraser && (
                    <>
                      <div>
                        <Label className="mb-3 block">Цвет</Label>
                        <div className="grid grid-cols-5 gap-2">
                          {["#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", 
                            "#FF00FF", "#00FFFF", "#FFA500", "#800080", "#FFC0CB"].map((color) => (
                            <button
                              key={color}
                              className={`w-full aspect-square rounded-md border-2 ${
                                brushColor === color ? "border-primary" : "border-transparent"
                              }`}
                              style={{ backgroundColor: color }}
                              onClick={() => setBrushColor(color)}
                            />
                          ))}
                        </div>
                        <div className="mt-3">
                          <input
                            type="color"
                            value={brushColor}
                            onChange={(e) => setBrushColor(e.target.value)}
                            className="w-full h-10 rounded cursor-pointer"
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="mb-3 block">Толщина: {brushWidth}px</Label>
                        <Slider
                          value={[brushWidth]}
                          onValueChange={(value) => setBrushWidth(value[0])}
                          min={1}
                          max={20}
                          step={1}
                        />
                      </div>
                    </>
                  )}

                  <div className="pt-4 border-t space-y-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleClearCanvas}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Очистить
                    </Button>
                    <Button
                      className="w-full"
                      onClick={handleDownloadCanvas}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Скачать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex-1">
              <Card className="h-full">
                <CardContent className="pt-6 h-full">
                  <div className="border rounded-lg overflow-hidden shadow-lg h-[calc(100vh-200px)] flex items-center justify-center bg-muted/20">
                    <canvas ref={canvasRef} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notes;
