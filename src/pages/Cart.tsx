import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingCart } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "UI/UX design",
      price: 120,
      author: "Zh.Tair",
      image: "gradient"
    },
  ]);

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <ShoppingCart className="h-8 w-8" />
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <Card className="p-12 text-center">
          <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground">Add some courses to get started!</p>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id}>
                  <div className="flex gap-4">
                    {item.image === "gradient" ? (
                      <div className="w-32 h-24 rounded-lg bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400 flex-shrink-0" />
                    ) : (
                      <img src={item.image} alt={item.title} className="w-32 h-24 rounded-lg object-cover flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">by {item.author}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-xl">${item.price}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  {item.id !== cartItems[cartItems.length - 1].id && (
                    <Separator className="mt-4" />
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between text-lg">
                <span className="font-medium">Subtotal:</span>
                <span>${total}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="font-medium">Tax:</span>
                <span>${(total * 0.1).toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-2xl font-bold">
                <span>Total:</span>
                <span className="text-primary">${(total * 1.1).toFixed(2)}</span>
              </div>
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Cart;
