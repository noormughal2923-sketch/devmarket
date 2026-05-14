import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Package, ShoppingBag, Trash2 } from "lucide-react";
import { motion } from "motion/react";

function formatUsd(cents: bigint): string {
  return `$${(Number(cents) / 100).toFixed(2)}`;
}

export default function Cart() {
  const { items, totalAmount, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4"
        data-ocid="cart.empty_state"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground max-w-sm">
            Discover our premium digital projects and add them to your cart.
          </p>
          <Link to="/products" data-ocid="cart.browse_products_link">
            <Button variant="default" size="lg" className="mt-2 gap-2">
              <Package className="w-4 h-4" />
              Browse Products
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          Shopping Cart
        </h1>
        <p className="text-muted-foreground mb-8">
          {items.length} {items.length === 1 ? "item" : "items"} in your cart
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div
          className="lg:col-span-2 flex flex-col gap-3"
          data-ocid="cart.list"
        >
          {items.map((item, index) => (
            <motion.div
              key={item.productId.toString()}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.07 }}
              data-ocid={`cart.item.${index + 1}`}
            >
              <Card className="overflow-hidden border border-border shadow-subtle">
                <CardContent className="p-4 flex gap-4">
                  {/* Product thumbnail */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    {item.previewImageUrl ? (
                      <img
                        src={item.previewImageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-display font-semibold text-foreground truncate">
                          {item.title}
                        </h3>
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {item.category}
                        </Badge>
                      </div>
                      <span className="text-lg font-display font-bold text-accent-foreground bg-accent/20 px-2 py-0.5 rounded-md flex-shrink-0">
                        {formatUsd(item.priceUsd * BigInt(item.quantity))}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm text-muted-foreground">
                        {formatUsd(item.priceUsd)} &times; {item.quantity}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-1.5 -mr-1"
                        onClick={() => removeItem(item.productId)}
                        data-ocid={`cart.delete_button.${index + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          data-ocid="cart.summary_panel"
        >
          <Card className="border border-border shadow-elevated sticky top-24">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-lg">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.productId.toString()}
                  className="flex justify-between text-sm"
                >
                  <span className="text-muted-foreground truncate mr-2 max-w-[180px]">
                    {item.title}
                  </span>
                  <span className="font-medium text-foreground flex-shrink-0">
                    {formatUsd(item.priceUsd * BigInt(item.quantity))}
                  </span>
                </div>
              ))}
              <Separator className="my-2" />
              <div className="flex justify-between font-display font-bold text-foreground">
                <span>Subtotal</span>
                <span className="text-accent-foreground">
                  {formatUsd(totalAmount)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                All prices in USD. Payment via JazzCash or Allied Bank.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Link
                to="/checkout"
                className="w-full"
                data-ocid="cart.checkout_button"
              >
                <Button
                  type="button"
                  className="w-full gap-2 font-semibold"
                  size="lg"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
