import style from './Footer.module.css'

export default function Footer() {
    return (
        <>
            <div className={style.footer}>
                <h1>BIORYX</h1>

                <div className={style.info}>
                    <ul>
                        <li>
                            <a
                                href="https://www.instagram.com/bioryx.official"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className={style.socialIcons}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                    </svg>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className={style.socialIcons}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                        <rect width="4" height="12" x="2" y="9" />
                                        <circle cx="4" cy="4" r="2" />
                                    </svg>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://x.com/BioryxOfficial"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className={style.socialIcons}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                                    </svg>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.facebook.com/share/1Fn4i4pJi1/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className={style.socialIcons}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                    </svg>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://chat.whatsapp.com/IDyoVAj9X0QFfMpI2DTfC8?mode=gi_t"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className={style.socialIcons}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28" fill="currentColor">
                                        <path d="M16 .4C7.6.4.8 7.2.8 15.6c0 2.7.7 5.2 2 7.5L.4 31.6l8.7-2.3c2.2 1.2 4.7 1.9 7.3 1.9 8.4 0 15.2-6.8 15.2-15.2S24.4.4 16 .4zm0 27.7c-2.3 0-4.6-.6-6.6-1.8l-.5-.3-5.2 1.4 1.4-5-.3-.5c-1.3-2-2-4.3-2-6.7C2.8 8.1 8.9 2 16 2s13.2 6.1 13.2 13.2S23.1 28.1 16 28.1z" />
                                    </svg>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.youtube.com/@Bioryxofficial"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className={style.socialIcons}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                                        <path d="m10 15 5-3-5-3z" />
                                    </svg>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}