import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/cart/card";
import { Eye, EyeOff, UserPlus, Building2, Mail, Lock, Utensils, Coffee, Sandwich, Hotel, Check, Loader2 } from "lucide-react";
import { useMutation } from '@tanstack/react-query';
import { registerUser } from "../API/auth";

export default function Register() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    type_id: "2" // Default to restaurant
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const businessTypes = [
    { id: "1", name: "Cafe", icon: Coffee },
    { id: "2", name: "Restaurant", icon: Utensils },
    { id: "3", name: "Snack", icon: Sandwich },
    { id: "4", name: "Hotel", icon: Hotel }
  ];

  const mutation = useMutation({
    mutationFn: async (data) => {
      setIsSubmitting(true);
      return registerUser(data);
    },
    onSuccess: (res) => {
      console.log("Registration successful:", res);
      // Add a small delay to show the loading dots before navigation
      setTimeout(() => {
        navigate("/verify-code", {
          state: { message: `Registration successful! Please verify ${formData.email}`, user_id: res.user_id, email: formData.email },
        });
      }, 800);
    },
    onError: (err) => {
      setError(err.message || 'Registration failed. Please try again.');
      setIsSubmitting(false);
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.password_confirmation) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    mutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/10 py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-6">
          <div className="mx-auto w-14 h-14 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center mb-3">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Start collecting customer feedback in minutes
          </p>
        </div>

        {/* Form Card */}
        <Card className="shadow-md border-0 rounded-lg overflow-hidden">
          <CardHeader className="space-y-1 bg-gradient-to-r from-primary/5 to-primary/10 py-4">
            <CardTitle className="text-xl text-center">Get Started Free</CardTitle>
            <CardDescription className="text-center text-primary/80 text-xs">
              Create your business account to begin
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 pb-5">
            {error && (
              <div className="mb-3 p-2 bg-destructive/10 text-destructive text-xs rounded flex items-center border border-destructive/20">
                <span className="flex-grow">{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1 relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Business name"
                  value={formData.name}
                  onChange={handleChange}
                  className="py-4 pl-9 pr-3 text-sm rounded-md"
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="space-y-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Business email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="py-4 pl-9 pr-3 text-sm rounded-md"
                  disabled={isSubmitting}
                />
              </div>
              
              {/* Business Type Selection */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Business Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {businessTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <div
                        key={type.id}
                        className={`relative flex cursor-pointer rounded-md border p-2 transition-all ${
                          formData.type_id === type.id
                            ? 'border-primary bg-primary/10 shadow-sm'
                            : 'border-border hover:border-primary/40'
                        } ${isSubmitting ? 'opacity-70 pointer-events-none' : ''}`}
                        onClick={() => !isSubmitting && setFormData({...formData, type_id: type.id})}
                      >
                        <input
                          type="radio"
                          name="type_id"
                          value={type.id}
                          checked={formData.type_id === type.id}
                          onChange={handleChange}
                          className="sr-only"
                          disabled={isSubmitting}
                        />
                        <div className="flex flex-col items-center space-y-0.5 w-full">
                          <IconComponent className={`h-4 w-4 ${formData.type_id === type.id ? 'text-primary' : 'text-muted-foreground'}`} />
                          <span className="text-xs font-medium">{type.name}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="space-y-1 relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="py-4 pl-9 pr-10 text-sm rounded-md"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              <div className="space-y-1 relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password_confirmation"
                  name="password_confirmation"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  placeholder="Confirm password"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  className="py-4 pl-9 pr-10 text-sm rounded-md"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isSubmitting}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              <div className="flex items-start space-x-2 pt-1">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-3 w-3 text-primary focus:ring-primary border-border rounded mt-0.5"
                  disabled={isSubmitting}
                />
                <label htmlFor="terms" className="block text-xs text-muted-foreground">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary hover:text-primary/80 underline">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary hover:text-primary/80 underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="flex space-x-1 mr-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    Creating account...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <UserPlus className="w-4 h-4 mr-1.5" />
                    Create Account
                  </div>
                )}
              </button>
            </form>
            
            <div className="mt-4 text-center pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Already have an account?{" "}
                <Link 
                  to="/login" 
                  className="font-medium text-primary hover:text-primary/80 underline transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center text-xs text-muted-foreground/70 mt-4">
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </div>
      </div>
    </div>
  );
}