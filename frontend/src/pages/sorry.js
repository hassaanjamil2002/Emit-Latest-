import React from 'react';
import { motion } from 'framer-motion';

const SorryPage = () => {
    return (
        <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow-lg rounded-2xl p-10 text-center"
            >
                <h1 className="text-6xl font-bold text-red-500 mb-4">Sorry</h1>
                <p className="text-gray-600 text-lg">We couldn’t process your request. Please try again later.</p>
            </motion.div>
        </div>
    );
};

export default SorryPage;