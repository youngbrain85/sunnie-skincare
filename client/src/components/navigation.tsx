import { useState } from "react";
import { Heart, Menu, X, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "홈", type: "route" },
    { href: "#services", label: "서비스", type: "scroll" },
    { href: "/blog", label: "뷰티블로그", type: "route" },
    { href: "/skin-analysis", label: "피부진단", type: "route" },
    { href: "/admin", label: "관리자", type: "route" },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.type === "scroll") {
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 skin-accent-bg rounded-lg flex items-center justify-center">
                <Heart className="text-white" size={16} />
              </div>
              <span className="text-xl font-bold gradient-text-pink">Sunnie</span>
              <span className="text-sm text-gray-500 font-normal">Skincare</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.type === "route" ? (
                <Link key={item.href} href={item.href}>
                  <span className={`text-neutral-600 hover:text-primary transition-colors cursor-pointer ${
                    location === item.href ? 'text-primary font-medium' : ''
                  }`}>
                    {item.label}
                  </span>
                </Link>
              ) : (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item)}
                  className="text-neutral-600 hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              )
            ))}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  item.type === "route" ? (
                    <Link key={item.href} href={item.href}>
                      <span 
                        onClick={() => setIsOpen(false)}
                        className={`text-left text-lg text-neutral-600 hover:text-primary transition-colors py-2 cursor-pointer block ${
                          location === item.href ? 'text-primary font-medium' : ''
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  ) : (
                    <button
                      key={item.href}
                      onClick={() => handleNavClick(item)}
                      className="text-left text-lg text-neutral-600 hover:text-primary transition-colors py-2"
                    >
                      {item.label}
                    </button>
                  )
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
