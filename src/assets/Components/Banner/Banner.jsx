import style from './Banner.module.css'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { bannerAPI } from '../../../utils/api'

export default function Banner()
{
    const [bannerUrl, setBannerUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const result = await bannerAPI.checkBannerExists();
                if (result.exists && result.data) {
                    const url = URL.createObjectURL(result.data);
                    setBannerUrl(url);
                }
            } catch {
                // No custom banner, will use default
            } finally {
                setLoading(false);
            }
        };
        fetchBanner();

        // Cleanup object URL on unmount
        return () => {
            if (bannerUrl) {
                URL.revokeObjectURL(bannerUrl);
            }
        };
    }, []);

    if (loading) {
        return <div className={style.banner}></div>;
    }

    // If a custom banner image exists in MongoDB, display it
    if (bannerUrl) {
        return (
            <motion.div 
                className={style.customBanner}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <img 
                    src={bannerUrl} 
                    alt="Bioryx Banner" 
                    className={style.customBannerImage}
                />
            </motion.div>
        );
    }

    // Default banner with animation (original)
    return(
        <motion.div 
            className={style.banner}
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ duration: 1 }}
        >
            <motion.h1
                initial={{ x: -100, opacity: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
            >
                Welcome to Bioryx
            </motion.h1>
            <motion.h3
                initial={{ x: 100, opacity: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                -Where Biology meets purpose
            </motion.h3>
        </motion.div>
    )
}