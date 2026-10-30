'use client';

import { useEffect, useRef, useState, type MouseEvent, type TouchEvent } from 'react';
import Image from 'next/image';
import { siteConfig } from '../lib/siteConfig';

export default function CertificateAlbum() {
    const certificates = siteConfig.certificates;
    const bookRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);

    const [currentPage, setCurrentPage] = useState(0);

    const totalPages = certificates.length;
    const sheets = certificates.length + 1;

    const nextPage = () => {
        setCurrentPage((page) => Math.min(page + 1, totalPages));
    };

    const previousPage = () => {
        setCurrentPage((page) => Math.max(page - 1, 0));
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight' || event.key === 'PageDown') {
                event.preventDefault();
                nextPage();
            }

            if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
                event.preventDefault();
                previousPage();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleBookClick = (event: MouseEvent<HTMLDivElement>) => {
        if ((event.target as HTMLElement).closest('img')) {
            return;
        }

        if (currentPage === 0) {
            nextPage();
            return;
        }

        const book = bookRef.current;

        if (!book) {
            return;
        }

        const rect = book.getBoundingClientRect();

        const clickX =
            event.clientX - rect.left;

        if (clickX > rect.width / 2) {
            nextPage();
        } else {
            previousPage();
        }
    };

    const handleTouchStart = (
        event: TouchEvent<HTMLDivElement>
    ) => {
        const touch =
            event.changedTouches[0];

        touchStartX.current =
            touch.screenX;

        touchStartY.current =
            touch.screenY;
    };

    const handleTouchEnd = (
        event: TouchEvent<HTMLDivElement>
    ) => {
        const touch =
            event.changedTouches[0];

        const differenceX =
            touch.screenX -
            touchStartX.current;

        const differenceY =
            touch.screenY -
            touchStartY.current;

        if (
            Math.abs(differenceX) <
            Math.abs(differenceY)
        ) {
            return;
        }

        if (differenceX < -50) {
            nextPage();
        } else if (differenceX > 50) {
            previousPage();
        }
    };

    return (
        <div className="certificate-album-shell">

            <div className="certificate-book-wrapper">

                <div
                    ref={bookRef}
                    className={
                        `certificate-book ${
                            currentPage === 0
                                ? 'book-closed'
                                : ''
                        }`
                    }
                    onClick={handleBookClick}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    role="region"
                    aria-label="Interactive certificate book"
                >

                    {/* =====================================
                        FRONT COVER SHEET
                    ====================================== */}

                    <div
                        className={
                            `certificate-sheet certificate-cover-sheet ${
                                currentPage > 0
                                    ? 'turned'
                                    : ''
                            }`
                        }
                        style={{
                            zIndex:
                                currentPage > 0
                                    ? 100
                                    : sheets + 10
                        }}
                    >

                        {/* CLOSED BOOK LOWER BOARD */}

                        <div
                            className="certificate-cover-board"
                            aria-hidden="true"
                        />

                        {/* CLOSED BOOK PAPER BLOCK */}

                        <div
                            className="certificate-cover-pages"
                            aria-hidden="true"
                        />


                        {/* FRONT COVER */}

                        <div className="certificate-page certificate-cover-front">

                            <div className="certificate-cover-content">

                                <h1>
                                    MY CERTIFICATES
                                </h1>

                                <h3>
                                    my learning journey
                                </h3>

                                <div className="certificate-cover-image">

                                    <Image
                                        src={
                                            siteConfig.personal
                                                .profileImage
                                        }
                                        alt={
                                            siteConfig.personal
                                                .name
                                        }
                                        fill
                                        sizes="180px"
                                        className="object-cover"
                                    />

                                </div>

                                <p className="certificate-publisher">
                                    Portfolio 2026
                                    <br />
                                    {
                                        siteConfig.personal
                                            .name
                                    }
                                </p>

                                <p className="certificate-author">
                                    Certificate Collection
                                </p>

                            </div>

                        </div>


                        {/* BACK OF FRONT COVER */}

                        <div className="certificate-page certificate-description-page">

                            <CertificateDescription
                                certificate={
                                    certificates[0]
                                }
                                index={0}
                            />

                        </div>

                    </div>


                    {/* =====================================
                        CERTIFICATE SHEETS
                    ====================================== */}

                    {certificates.map(
                        (certificate, index) => {

                            const sheetIndex =
                                index + 1;

                            const nextCertificate =
                                certificates[
                                    index + 1
                                ];

                            const isTurned =
                                currentPage >
                                sheetIndex;

                            return (
                                <div
                                    key={`${certificate.title}-${certificate.year}`}
                                    className={
                                        `certificate-sheet ${
                                            isTurned
                                                ? 'turned'
                                                : ''
                                        }`
                                    }
                                    style={{
                                        zIndex:
                                            isTurned
                                                ? 100 +
                                                  sheetIndex
                                                : sheets -
                                                  sheetIndex
                                    }}
                                >

                                    {/* FRONT = CERTIFICATE IMAGE */}

                                    <div className="certificate-page certificate-image-page">

                                        <div className="certificate-image-content">

                                            <Image
                                                src={
                                                    certificate.image
                                                }
                                                alt={
                                                    certificate.title
                                                }
                                                fill
                                                sizes="(max-width: 700px) 45vw, 430px"
                                                className="object-contain"
                                            />

                                        </div>

                                    </div>


                                    {/* BACK = NEXT DESCRIPTION */}

                                    <div className="certificate-page certificate-description-page">

                                        {nextCertificate ? (

                                            <CertificateDescription
                                                certificate={
                                                    nextCertificate
                                                }
                                                index={
                                                    index + 1
                                                }
                                            />

                                        ) : (

                                            <div className="certificate-back-cover-content">

                                                <h2>
                                                    THE END
                                                </h2>

                                                <p>
                                                    Thank you
                                                    for viewing
                                                    my certificates.
                                                </p>

                                            </div>

                                        )}

                                    </div>

                                </div>
                            );
                        }
                    )}


                    {/* SPINE */}

                    <div
                        className="certificate-book-spine"
                        aria-hidden="true"
                    />

                </div>

            </div>


            {/* =====================================
                CONTROLS
            ====================================== */}

            <div className="certificate-book-controls">

                <button
                    type="button"
                    className="certificate-control-button"
                    onClick={previousPage}
                    disabled={
                        currentPage === 0
                    }
                    aria-label="Previous page"
                >
                    &#10094;
                </button>

                <div
                    className="certificate-page-counter"
                    aria-live="polite"
                >
                    {
                        currentPage === 0
                            ? 'Cover'
                            : `Page ${currentPage} / ${totalPages}`
                    }
                </div>

                <button
                    type="button"
                    className="certificate-control-button"
                    onClick={nextPage}
                    disabled={
                        currentPage === totalPages
                    }
                    aria-label="Next page"
                >
                    &#10095;
                </button>

            </div>

        </div>
    );
}


/* =========================================================
   CERTIFICATE DESCRIPTION
   ========================================================= */

type CertificateDescriptionProps = {
    certificate:
        (typeof siteConfig.certificates)[number];

    index: number;
};


function CertificateDescription({
    certificate,
    index
}: CertificateDescriptionProps) {

    return (
        <div className="certificate-content-page">

            <div className="certificate-description">

                <h2>
                    {certificate.title}
                </h2>

                <p>
                    This certificate represents a part
                    of my continuous learning, practical
                    growth, and technical development.
                </p>


                <div className="certificate-description-meta">

                    <div>
                        <span>
                            ISSUED BY
                        </span>

                        <strong>
                            {certificate.issuer}
                        </strong>
                    </div>


                    <div>
                        <span>
                            YEAR
                        </span>

                        <strong>
                            {certificate.year}
                        </strong>
                    </div>

                </div>


                <span className="certificate-description-date">
                    Certificate{' '}
                    {String(index + 1).padStart(2, '0')}
                </span>

            </div>

        </div>
    );
}