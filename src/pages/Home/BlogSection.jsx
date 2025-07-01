import {
  FiCalendar,
  FiUser,
  FiBookmark,
  FiShare2,
  FiMessageSquare,
} from "react-icons/fi";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useState } from "react";

const BlogSection = () => {
  const [bookmarked, setBookmarked] = useState([]);

  const toggleBookmark = (id) => {
    if (bookmarked.includes(id)) {
      setBookmarked(bookmarked.filter((item) => item !== id));
    } else {
      setBookmarked([...bookmarked, id]);
    }
  };

  const blogPosts = [
    {
      id: 1,
      title: "Optimizing Your Food Inventory Management",
      excerpt:
        "Learn how to streamline your food inventory process with these professional tips and tricks to reduce waste and increase efficiency.",
      author: "Sarah Johnson",
      date: "May 15, 2023",
      readTime: "5 min read",
      category: "Inventory",
      image:
        "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 2,
      title: "The Psychology Behind Customer Purchases",
      excerpt:
        "Understanding customer behavior can dramatically improve your sales. Discover the psychological triggers that influence purchase decisions.",
      author: "Michael Chen",
      date: "June 2, 2023",
      readTime: "7 min read",
      category: "Sales",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 3,
      title: "User Engagement Strategies That Work",
      excerpt:
        "Proven methods to increase user engagement and retention for your platform. Case studies from top performers in the industry.",
      author: "Emily Rodriguez",
      date: "June 18, 2023",
      readTime: "6 min read",
      category: "Users",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  return (
    <div className="mt-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-11/12 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
            Latest{" "}
            <span className="text-orange-400 dark:text-orange-300">
              Insights
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Professional articles and guides to help you optimize your food,
            purchases, and user management.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Featured Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Post Content */}
              <div className="p-6">
                {/* Category Tag */}
                <span className="inline-block px-3 py-1 text-xs font-semibold text-amber-600 bg-amber-100 dark:bg-amber-200 dark:text-amber-700 rounded-full mb-3">
                  {post.category}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 hover:text-amber-500 transition-colors">
                  <a href="#">{post.title}</a>
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center mr-4">
                    <FiUser className="mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <FiCalendar className="mr-1" />
                    <span>{post.date}</span>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {post.readTime}
                  </span>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => toggleBookmark(post.id)}
                      className="text-gray-400 hover:text-amber-500 transition-colors"
                      aria-label="Bookmark"
                    >
                      {bookmarked.includes(post.id) ? (
                        <FaBookmark className="text-amber-500" />
                      ) : (
                        <FaRegBookmark />
                      )}
                    </button>
                    <button className="text-gray-400 hover:text-amber-500 transition-colors">
                      <FiShare2 />
                    </button>
                    <button className="text-gray-400 hover:text-amber-500 transition-colors">
                      <FiMessageSquare />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
