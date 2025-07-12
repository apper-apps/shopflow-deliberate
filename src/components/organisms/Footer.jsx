import React from "react";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Footer = () => {
  const footerSections = [
    {
      title: "Shop",
      links: [
        { name: "All Products", href: "/" },
        { name: "Electronics", href: "/category/electronics" },
        { name: "Clothing", href: "/category/clothing" },
        { name: "Home & Garden", href: "/category/home" },
        { name: "Sports", href: "/category/sports" }
      ]
    },
    {
      title: "Customer Service",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "FAQ", href: "/faq" },
        { name: "Shipping Info", href: "/shipping" },
        { name: "Returns", href: "/returns" },
        { name: "Size Guide", href: "/size-guide" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
        { name: "Blog", href: "/blog" },
        { name: "Affiliate Program", href: "/affiliate" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "Accessibility", href: "/accessibility" }
      ]
    }
  ];

  return (
    <footer className="bg-white border-t border-secondary-200 mt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-2">
                <ApperIcon name="ShoppingBag" size={24} className="text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                ShopFlow
              </span>
            </Link>
            <p className="text-secondary-600 mb-6 leading-relaxed">
              Your trusted e-commerce destination for quality products at great prices. 
              Shop with confidence and enjoy our premium shopping experience.
            </p>
            
            {/* Newsletter Signup */}
            <div className="space-y-3">
              <p className="font-medium text-secondary-900">Stay Updated</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <Button size="sm">
                  <ApperIcon name="Send" size={16} />
                </Button>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-secondary-900 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-secondary-600 hover:text-primary-600 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="border-t border-secondary-200 mt-12 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="flex items-center gap-3 p-4 bg-secondary-50 rounded-lg">
              <div className="bg-green-100 rounded-full p-2">
                <ApperIcon name="Truck" size={20} className="text-green-600" />
              </div>
              <div>
                <p className="font-medium text-secondary-900 text-sm">Free Shipping</p>
                <p className="text-xs text-secondary-600">On orders over $50</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-secondary-50 rounded-lg">
              <div className="bg-blue-100 rounded-full p-2">
                <ApperIcon name="RotateCcw" size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-secondary-900 text-sm">Easy Returns</p>
                <p className="text-xs text-secondary-600">30-day policy</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-secondary-50 rounded-lg">
              <div className="bg-purple-100 rounded-full p-2">
                <ApperIcon name="Shield" size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-secondary-900 text-sm">Secure Payment</p>
                <p className="text-xs text-secondary-600">SSL encrypted</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-secondary-50 rounded-lg">
              <div className="bg-orange-100 rounded-full p-2">
                <ApperIcon name="Headphones" size={20} className="text-orange-600" />
              </div>
              <div>
                <p className="font-medium text-secondary-900 text-sm">24/7 Support</p>
                <p className="text-xs text-secondary-600">Always here to help</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-secondary-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-secondary-600 text-sm">
            © 2024 ShopFlow. All rights reserved.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-secondary-600">Follow us:</span>
            <div className="flex gap-2">
              {["Facebook", "Twitter", "Instagram", "Youtube"].map((social) => (
                <Button
                  key={social}
                  variant="ghost"
                  size="sm"
                  className="w-8 h-8 p-0 rounded-full hover:bg-primary-50 hover:text-primary-600"
                >
                  <ApperIcon name={social} size={16} />
                </Button>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-secondary-600">We accept:</span>
            <div className="flex gap-1">
              {["CreditCard", "Wallet", "Smartphone"].map((method) => (
                <div key={method} className="bg-secondary-100 rounded p-1">
                  <ApperIcon name={method} size={16} className="text-secondary-600" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;