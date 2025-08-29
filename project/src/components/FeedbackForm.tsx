import React, { useState } from 'react';
import { Send, CheckCircle, Mail, User, MessageSquare, Heart, Sparkles, Zap } from 'lucide-react';
import StarRating from './StarRating';

const getSourceName = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("source") || "FeedbackApp";
};

interface FormData {
  name: string;
  email: string;
  rating: number;
  comments: string;
}
interface FormErrors {
  name?: string;
  email?: string;
  rating?: string;
  comments?: string;
}



const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    rating: 0,
    comments: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.rating === 0) {
      newErrors.rating = 'Please select a rating';
    }

    if (!formData.comments.trim()) {
      newErrors.comments = 'Comments are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/.netlify/functions/submitFeedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          rating: formData.rating,
          comments: formData.comments,
          source: getSourceName()
        }),
      });

      const data = await res.json();
      if (data.success) {
        console.log("✅ Feedback saved:", formData);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", rating: 0, comments: "" });
      } else {
        alert("❌ Failed to submit: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("⚠️ Backend connection failed:", err);
      alert("⚠️ Could not connect to backend");
    }

    setIsSubmitting(false);
  };

  

  const handleInputChange = (field: keyof FormData, value: string | number) => {
  setFormData(prev => ({
    ...prev,
    [field]: field === "rating" ? Number(value) : value
  }));

  // Clear error when user starts typing
  if (errors[field as keyof FormErrors]) {
    setErrors(prev => ({ ...prev, [field]: undefined }));
  }
};


  const resetForm = () => {
    setFormData({ name: '', email: '', rating: 0, comments: '' });
    setIsSubmitted(false);
    setErrors({});
    setFocusedField(null);
  };

  const getRatingMessage = (rating: number) => {
    const messages = {
      1: { text: "We'll do better! 😔", color: "text-red-500", bg: "bg-red-100" },
      2: { text: "Thanks for the feedback! 🤔", color: "text-orange-500", bg: "bg-orange-100" },
      3: { text: "Good to know! 😊", color: "text-yellow-500", bg: "bg-yellow-100" },
      4: { text: "Great to hear! 😄", color: "text-lime-500", bg: "bg-lime-100" },
      5: { text: "You're amazing! 🎉", color: "text-green-500", bg: "bg-green-100" }
    };
    return messages[rating as keyof typeof messages];
  };
  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8 text-center">
        <div className="mb-6">
            <div className="relative">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4 animate-bounce" />
              <Sparkles className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2 animate-spin" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Thank You! 🎉
            </h2>
            <p className="text-gray-600 text-lg">Your feedback has been submitted successfully.</p>
            <div className="flex justify-center space-x-2 mt-4">
              <Heart className="w-6 h-6 text-red-500 animate-pulse" />
              <Heart className="w-6 h-6 text-pink-500 animate-pulse delay-200" />
              <Heart className="w-6 h-6 text-purple-500 animate-pulse delay-400" />
            </div>
        </div>
        <button
          onClick={resetForm}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 flex items-center justify-center space-x-2"
        >
            <Zap className="w-5 h-5" />
          Submit Another Feedback
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8">
        
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Sparkles className="w-8 h-8 text-yellow-500 animate-spin" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              We Value Your Feedback
            </h1>
            <Sparkles className="w-8 h-8 text-pink-500 animate-spin" />
          </div>
          <p className="text-gray-600 text-lg">Help us improve by sharing your colorful experience! 🌈</p>
      </div>

        <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
            <label className="flex items-center text-sm font-bold text-gray-700 mb-3">
              <User className={`w-5 h-5 mr-2 transition-colors duration-300 ${focusedField === 'name' ? 'text-purple-500' : 'text-gray-500'}`} />
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-300 transform hover:scale-105 focus:scale-105 ${
              errors.name 
                ? 'border-red-500 bg-red-50 shadow-red-200' 
                : focusedField === 'name'
                ? 'border-purple-500 bg-purple-50 shadow-lg shadow-purple-200'
                : 'border-gray-300 hover:border-purple-300 hover:shadow-md'
            }`}
            placeholder="Enter your awesome name ✨"
          />
          {errors.name && <p className="text-red-500 text-sm mt-2 animate-shake">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div>
            <label className="flex items-center text-sm font-bold text-gray-700 mb-3">
              <Mail className={`w-5 h-5 mr-2 transition-colors duration-300 ${focusedField === 'email' ? 'text-blue-500' : 'text-gray-500'}`} />
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 transform hover:scale-105 focus:scale-105 ${
              errors.email 
                ? 'border-red-500 bg-red-50 shadow-red-200' 
                : focusedField === 'email'
                ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-200'
                : 'border-gray-300 hover:border-blue-300 hover:shadow-md'
            }`}
            placeholder="your.email@awesome.com 📧"
          />
          {errors.email && <p className="text-red-500 text-sm mt-2 animate-shake">{errors.email}</p>}
        </div>

        {/* Star Rating */}
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-4 text-center">
              Overall Rating ⭐
          </label>
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-4 mb-3">
            <StarRating
              rating={formData.rating}
              onRatingChange={(rating) => handleInputChange('rating', rating)}
                size={40}
            />
            </div>
            <div className="text-center">
              {formData.rating > 0 ? (
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${getRatingMessage(formData.rating).bg} transition-all duration-300`}>
                  <span className={`font-bold ${getRatingMessage(formData.rating).color}`}>
                    {getRatingMessage(formData.rating).text}
                  </span>
                </div>
              ) : (
                <span className="text-gray-500 text-sm">Click the stars to rate! ✨</span>
              )}
            </div>
          {errors.rating && <p className="text-red-500 text-sm mt-2 text-center animate-shake">{errors.rating}</p>}
        </div>

        {/* Comments Field */}
        <div>
            <label className="flex items-center text-sm font-bold text-gray-700 mb-3">
              <MessageSquare className={`w-5 h-5 mr-2 transition-colors duration-300 ${focusedField === 'comments' ? 'text-green-500' : 'text-gray-500'}`} />
            Comments
          </label>
          <textarea
            rows={5}
            value={formData.comments}
            onChange={(e) => handleInputChange('comments', e.target.value)}
            onFocus={() => setFocusedField('comments')}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-green-300 focus:border-green-500 transition-all duration-300 resize-none transform hover:scale-105 focus:scale-105 ${
              errors.comments 
                ? 'border-red-500 bg-red-50 shadow-red-200' 
                : focusedField === 'comments'
                ? 'border-green-500 bg-green-50 shadow-lg shadow-green-200'
                : 'border-gray-300 hover:border-green-300 hover:shadow-md'
            }`}
            placeholder="Share your colorful thoughts and amazing suggestions... 🌈💭"
          />
          <div className="flex justify-between items-center mt-2">
            {errors.comments && <p className="text-red-500 text-sm animate-shake">{errors.comments}</p>}
            <p className={`text-sm ml-auto transition-colors duration-300 ${
              formData.comments.length > 400 ? 'text-orange-500 font-bold' : 
              formData.comments.length > 200 ? 'text-yellow-600' : 'text-gray-400'
            }`}>
              {formData.comments.length}/500 characters
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 transform hover:scale-105 active:scale-95 disabled:scale-100 shadow-lg hover:shadow-2xl disabled:shadow-none"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span className="text-lg">Submitting your awesome feedback... ✨</span>
            </>
          ) : (
            <>
              <Send className="w-6 h-6 animate-pulse" />
              <span className="text-lg">Submit My Colorful Feedback! 🚀</span>
            </>
          )}
        </button>
      </form>
      </div>
  );
};

export default FeedbackForm;