'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Artists list - Add or customize artists here
export const ARTISTS = [
    {
        slug: 'david',
        name: 'David Ngachi',
        artwork1: {
            image: '/assets/artwork1.png',
            title: '“The Prince” (The Tale of Patrick the Terrible Series)',
            medium: 'Oil on Canvas',
            dimension: '24 × 24 in',
            date: '2025',
            status: 'Acquired',
        },
        artwork2: {
            image: '/assets/artwork2.png',
            title: '“Rituals and Goats”',
            medium: 'Oil on Canvas',
            dimension: '60 × 72 in',
            date: '2025',
            status: 'Reserved',
        },
    },
    // Next artist template (replace with your next artist's info):
    {
        slug: 'next-artist',
        name: 'Next Artist',
        artwork1: {
            image: '/assets/artwork1.png',
            title: '“Upcoming Series I”',
            medium: 'Oil on Canvas',
            dimension: '36 × 48 in',
            date: '2025',
            status: 'Acquired',
        },
        artwork2: {
            image: '/assets/artwork2.png',
            title: '“Upcoming Series II”',
            medium: 'Mixed Media',
            dimension: '48 × 60 in',
            date: '2025',
            status: 'Reserved',
        },
    },
];

export default function AssetPage({ onBack, person }) {
    const [artwork1Hovered, setArtwork1Hovered] = useState(false);
    const [artwork2Hovered, setArtwork2Hovered] = useState(false);
    const [mobileArtwork1Desc, setMobileArtwork1Desc] = useState(false);
    const [mobileArtwork2Desc, setMobileArtwork2Desc] = useState(false);
    const [currentArtistIndex, setCurrentArtistIndex] = useState(0);
    const containerRef = useRef(null);

    // Sync active artist from window hash or prop
    useEffect(() => {
        const syncArtistFromHash = () => {
            const rawHash = window.location.hash.replace('#', '');
            if (!rawHash || rawHash === 'assets' || rawHash === 'marcus') {
                window.location.hash = '#david';
                setCurrentArtistIndex(0);
                return;
            }
            const foundIdx = ARTISTS.findIndex((a) => a.slug === rawHash);
            if (foundIdx !== -1) {
                setCurrentArtistIndex(foundIdx);
            }
        };

        syncArtistFromHash();
        window.addEventListener('hashchange', syncArtistFromHash);
        return () => window.removeEventListener('hashchange', syncArtistFromHash);
    }, []);

    // Current active artist
    const currentPerson = person || ARTISTS[currentArtistIndex] || ARTISTS[0];

    // Artist navigation (< and >)
    const goPrevArtist = () => {
        const prevIdx = (currentArtistIndex - 1 + ARTISTS.length) % ARTISTS.length;
        setCurrentArtistIndex(prevIdx);
        window.location.hash = `#${ARTISTS[prevIdx].slug}`;
        setMobileArtwork1Desc(false);
        setMobileArtwork2Desc(false);
    };

    const goNextArtist = () => {
        const nextIdx = (currentArtistIndex + 1) % ARTISTS.length;
        setCurrentArtistIndex(nextIdx);
        window.location.hash = `#${ARTISTS[nextIdx].slug}`;
        setMobileArtwork1Desc(false);
        setMobileArtwork2Desc(false);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                goPrevArtist();
            } else if (e.key === 'ArrowRight') {
                goNextArtist();
            } else if (e.key === 'Escape' && onBack) {
                onBack();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentArtistIndex, onBack]);

    return (
        <main
            id="assets-page"
            className="relative w-full h-[100dvh] min-h-screen bg-black text-white overflow-hidden select-none flex flex-col justify-between"
            style={{
                fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif",
                WebkitFontSmoothing: 'antialiased',
            }}
        >
            {/* =========================================================
                TOP HEADER NAVIGATION: < (back) with "Asset" below
            ========================================================= */}
            <header className="relative w-full z-30 pt-6 md:pt-[4.8vh] pl-[5vw] flex flex-col items-start shrink-0">
                <button
                    type="button"
                    onClick={onBack ? onBack : () => { window.location.hash = ''; }}
                    aria-label="Back to home"
                    className="group inline-flex items-center text-white cursor-pointer focus:outline-none transition-opacity duration-200 hover:opacity-80"
                >
                    {/* Minimalist Left Chevron Arrow */}
                    <svg
                        width="15"
                        height="20"
                        viewBox="0 0 15 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-200 group-hover:-translate-x-1"
                    >
                        <polyline points="13 2 3 12 13 22" />
                    </svg>
                </button>

                <span
                    className="text-2xl md:text-[clamp(1.15rem,1.5vw,2rem)] font-medium tracking-tight text-white mt-12 md:mt-[7.5vh]"
                    style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 500,
                        color: '#FFFFFF',
                    }}
                >
                    Asset
                </span>
            </header>

            {/* =========================================================
                MAIN ASSET GALLERY / CAROUSEL COMPOSITION (DESKTOP)
                Recreating the exact 2304x1282 proportion and layering:
                - David Ngaji card (left dark card, overlaps grey card)
                - Grey card (middle backdrop card)
                - Artwork 1 (portrait)
                - Coral Pink divider bar
                - Artwork 2 (figures)
            ========================================================= */}
            <div className="hidden md:flex relative w-full flex-1 items-center overflow-x-clip overflow-y-visible mt-[5vh]">
                <div
                    ref={containerRef}
                    className="relative w-full h-full flex items-center transition-transform duration-500 ease-out"
                    style={{
                        transform: 'translateY(4.2vh)',
                    }}
                >
                    {/* Wrapper maintaining aspect ratio and relative positions */}
                    <div className="relative w-full h-full flex items-center">

                        {/* 1. David Ngaji Card (Overlapping left card)
                            Position in canvas: x=49px (2.12%), y=535px (41.73%), w=571px (24.78%), h=315px (24.57%)
                        */}
                        <div
                            className="absolute z-20 flex items-center shadow-2xl"
                            style={{
                                left: '2.12%',
                                width: '24.78%',
                                minWidth: '220px',
                                height: '24.57%',
                                minHeight: '130px',
                                maxHeight: '315px',
                                backgroundColor: '#383838',
                                paddingLeft: 'clamp(1.5rem, 3.2vw, 4.5rem)',
                            }}
                        >
                            <h2
                                className="text-white text-[clamp(1.1rem,1.45vw,1.85rem)] font-medium tracking-tight"
                                style={{
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontWeight: 500,
                                }}
                            >
                                {currentPerson.name}
                            </h2>
                        </div>

                        {/* 2. Middle Grey Card (Backdrop container)
                            Position in canvas: x=388px (16.84%), y=470px (36.66%), w=894px (38.80%), h=473px (36.89%)
                        */}
                        <div
                            className="absolute z-10"
                            style={{
                                left: '16.84%',
                                width: '38.80%',
                                minWidth: '320px',
                                height: '36.89%',
                                minHeight: '200px',
                                maxHeight: '473px',
                                backgroundColor: '#6A6A6A',
                            }}
                        />

                        {/* 3. Artwork 1: Portrait of bald figure
                            Position in canvas: x=1319px (57.25%), y=470px (36.66%), w=460px (19.96%), h=473px (36.89%)
                        */}
                        <div
                            className="absolute z-10 select-none group cursor-pointer"
                            style={{
                                left: '57.25%',
                                width: '19.96%',
                                minWidth: '170px',
                                height: '36.89%',
                                minHeight: '200px',
                                maxHeight: '473px',
                            }}
                            onMouseEnter={() => setArtwork1Hovered(true)}
                            onMouseLeave={() => setArtwork1Hovered(false)}
                        >
                            {/* Floating Description at the top of the image (outside) - only visible on hover */}
                            <div
                                className={`absolute bottom-full left-0 mb-3 z-30 flex flex-col gap-[3px] pointer-events-none select-none transition-all duration-300 ease-out ${artwork1Hovered
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
                                    }`}
                                style={{
                                    fontFamily: "'Montserrat', sans-serif",
                                    color: '#FFFFFF',
                                    width: 'max-content',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <p
                                    className="leading-snug whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                                    style={{
                                        fontSize: 'clamp(0.55rem, 0.72vw, 0.88rem)',
                                        fontStyle: 'italic',
                                        fontWeight: 600,
                                        color: '#FFFFFF',
                                    }}
                                >
                                    {currentPerson.artwork1?.title || '“The Prince” (The Tale of Patrick the Terrible Series)'}
                                </p>
                                <p
                                    className="whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                                    style={{ fontSize: 'clamp(0.48rem, 0.62vw, 0.75rem)', fontWeight: 400, color: 'rgba(255, 255, 255, 0.9)' }}
                                >
                                    Medium: {currentPerson.artwork1?.medium || 'Oil on Canvas'}
                                </p>
                                <p
                                    className="whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                                    style={{ fontSize: 'clamp(0.48rem, 0.62vw, 0.75rem)', fontWeight: 400, color: 'rgba(255, 255, 255, 0.9)' }}
                                >
                                    Dimension: {currentPerson.artwork1?.dimension || '24 × 24 in'}
                                </p>
                                <p
                                    className="whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                                    style={{ fontSize: 'clamp(0.48rem, 0.62vw, 0.75rem)', fontWeight: 400, color: 'rgba(255, 255, 255, 0.9)' }}
                                >
                                    Date: {currentPerson.artwork1?.date || '2025'}
                                </p>
                                {currentPerson.artwork1?.status ? (
                                    <p
                                        className="mt-[2px] whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                                        style={{
                                            fontSize: 'clamp(0.48rem, 0.62vw, 0.75rem)',
                                            fontWeight: 600,
                                            letterSpacing: '0.02em',
                                            color: '#FF2E4D',
                                        }}
                                    >
                                        {currentPerson.artwork1.status}
                                    </p>
                                ) : (
                                    <p
                                        className="mt-[2px] whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                                        style={{
                                            fontSize: 'clamp(0.48rem, 0.62vw, 0.75rem)',
                                            fontWeight: 600,
                                            letterSpacing: '0.02em',
                                            color: '#FFFFFF',
                                            opacity: 0.95,
                                        }}
                                    >
                                        Price: {currentPerson.artwork1?.price || '$9,000'}
                                    </p>
                                )}
                            </div>

                            {/* Image container */}
                            <div className="w-full h-full overflow-hidden shadow-lg">
                                <img
                                    src={currentPerson.artwork1?.image || currentPerson.artwork1}
                                    alt={`${currentPerson.name} artwork 1`}
                                    className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                                    draggable={false}
                                />
                            </div>
                        </div>

                        {/* 4. Vivid Coral Pink Vertical Bar
                            Position in canvas: x=1780px (77.25%), y=557px (43.45%), w=10px (0.43%), h=306px (23.87%)
                        */}
                        <div
                            className="absolute z-20 pointer-events-none"
                            style={{
                                left: '77.25%',
                                width: '9px',
                                height: '23.87%',
                                minHeight: '120px',
                                maxHeight: '306px',
                                backgroundColor: '#FD5178',
                            }}
                        />

                        {/* 5. Artwork 2: Dark surrealist figures
                            Position in canvas: x=1789px (77.65%), y=470px (36.66%), w=436px (18.92%), h=473px (36.89%)
                        */}
                        <div
                            className="absolute z-10 select-none group cursor-pointer"
                            style={{
                                left: '77.65%',
                                width: '18.92%',
                                minWidth: '160px',
                                height: '36.89%',
                                minHeight: '200px',
                                maxHeight: '473px',
                            }}
                            onMouseEnter={() => setArtwork2Hovered(true)}
                            onMouseLeave={() => setArtwork2Hovered(false)}
                        >
                            {/* Floating Description at the top of the image (outside) - only visible on hover */}
                            <div
                                className={`absolute bottom-full left-0 mb-3 z-30 flex flex-col gap-[3px] pointer-events-none select-none transition-all duration-300 ease-out ${artwork2Hovered
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
                                    }`}
                                style={{
                                    fontFamily: "'Montserrat', sans-serif",
                                    color: '#FFFFFF',
                                    width: 'max-content',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <p
                                    className="leading-snug whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                                    style={{
                                        fontSize: 'clamp(0.55rem, 0.72vw, 0.88rem)',
                                        fontStyle: 'italic',
                                        fontWeight: 600,
                                        color: '#FFFFFF',
                                    }}
                                >
                                    {currentPerson.artwork2?.title || '“Rituals and Goats”'}
                                </p>
                                <p
                                    className="whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                                    style={{ fontSize: 'clamp(0.48rem, 0.62vw, 0.75rem)', fontWeight: 400, color: 'rgba(255, 255, 255, 0.9)' }}
                                >
                                    Medium: {currentPerson.artwork2?.medium || 'Oil on Canvas'}
                                </p>
                                <p
                                    className="whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                                    style={{ fontSize: 'clamp(0.48rem, 0.62vw, 0.75rem)', fontWeight: 400, color: 'rgba(255, 255, 255, 0.9)' }}
                                >
                                    Dimension: {currentPerson.artwork2?.dimension || '60 × 72 in'}
                                </p>
                                <p
                                    className="whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                                    style={{ fontSize: 'clamp(0.48rem, 0.62vw, 0.75rem)', fontWeight: 400, color: 'rgba(255, 255, 255, 0.9)' }}
                                >
                                    Date: {currentPerson.artwork2?.date || '2025'}
                                </p>
                                {currentPerson.artwork2?.status ? (
                                    <p
                                        className="mt-[2px] whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                                        style={{
                                            fontSize: 'clamp(0.48rem, 0.62vw, 0.75rem)',
                                            fontWeight: 600,
                                            letterSpacing: '0.02em',
                                            color: '#FF2E4D',
                                        }}
                                    >
                                        {currentPerson.artwork2.status}
                                    </p>
                                ) : (
                                    <p
                                        className="mt-[2px] whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                                        style={{
                                            fontSize: 'clamp(0.48rem, 0.62vw, 0.75rem)',
                                            fontWeight: 600,
                                            letterSpacing: '0.02em',
                                            color: '#FF2E4D',
                                        }}
                                    >
                                        Reserved
                                    </p>
                                )}
                            </div>

                            {/* Image container */}
                            <div className="w-full h-full overflow-hidden shadow-lg">
                                <img
                                    src={currentPerson.artwork2?.image || currentPerson.artwork2}
                                    alt={`${currentPerson.name} artwork 2`}
                                    className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                                    draggable={false}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* =========================================================
                MAIN ASSET GALLERY / MOBILE VIEW (< md)
                Organized presentation of the desktop view elements:
                - David Ngachi card (#383838) overlapping Grey backdrop (#6A6A6A)
                - Artwork 1 with click-to-toggle description
                - Coral Pink divider (#FD5178)
                - Artwork 2 with click-to-toggle description
                - Minimal < > navigation
            ========================================================= */}
            <div className="flex md:hidden flex-col flex-1 justify-center overflow-hidden w-full">
                {/* Mobile Horizontal Artwork Flow */}
                <div className="flex-1 flex items-end overflow-x-auto no-scrollbar gap-4 pl-6 pr-12 pb-14 pt-20 w-full">
                    {/* 1. David Ngachi & Grey Backdrop Blocks (Exact desktop composition) */}
                    <div
                        className="relative shrink-0 flex items-center shadow-md select-none"
                        style={{ width: '250px', height: '210px' }}
                    >
                        {/* Grey Backdrop Card */}
                        <div
                            className="absolute right-0 top-0 bottom-0 shadow-lg"
                            style={{
                                width: '180px',
                                backgroundColor: '#6A6A6A',
                            }}
                        />

                        {/* David Ngachi Front Card */}
                        <div
                            className="absolute left-0 z-10 flex items-center shadow-2xl px-5"
                            style={{
                                width: '160px',
                                height: '135px',
                                backgroundColor: '#383838',
                            }}
                        >
                            <h2
                                className="text-white text-base font-medium tracking-tight"
                                style={{
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontWeight: 500,
                                }}
                            >
                                {currentPerson.name}
                            </h2>
                        </div>
                    </div>

                    {/* 2. Artwork 1 */}
                    <div
                        className="relative shrink-0 flex flex-col justify-end cursor-pointer group"
                        style={{ width: '210px' }}
                        onClick={() => setMobileArtwork1Desc((prev) => !prev)}
                    >
                        {/* Floating Description at top of image - toggles on click */}
                        <div
                            className={`absolute bottom-full left-0 mb-2.5 w-[210px] z-20 flex flex-col gap-[2px] select-none transition-all duration-300 ease-out ${
                                mobileArtwork1Desc
                                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                                    : 'opacity-0 translate-y-2 pointer-events-none'
                            }`}
                            style={{
                                fontFamily: "'Montserrat', sans-serif",
                                color: '#FFFFFF',
                            }}
                        >
                            <p
                                className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                                style={{ fontSize: '0.72rem', fontWeight: 500, color: 'rgba(255, 255, 255, 0.95)' }}
                            >
                                {currentPerson.artwork1?.title || '“The Prince” (The Tale of Patrick the Terrible Series)'}
                            </p>
                            <p
                                className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                                style={{ fontSize: '0.65rem', fontWeight: 400, color: 'rgba(255, 255, 255, 0.85)' }}
                            >
                                Medium: {currentPerson.artwork1?.medium || 'Oil on Canvas'}
                            </p>
                            <p
                                className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                                style={{ fontSize: '0.65rem', fontWeight: 400, color: 'rgba(255, 255, 255, 0.85)' }}
                            >
                                Dimension: {currentPerson.artwork1?.dimension || '24 × 24 in'}
                            </p>
                            <p
                                className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                                style={{ fontSize: '0.65rem', fontWeight: 400, color: 'rgba(255, 255, 255, 0.85)' }}
                            >
                                Date: {currentPerson.artwork1?.date || '2025'}
                            </p>
                            <p
                                className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                                style={{ fontSize: '0.68rem', fontWeight: 600, color: '#FF2E4D' }}
                            >
                                {currentPerson.artwork1?.status || 'Acquired'}
                            </p>
                        </div>

                        {/* Artwork 1 Image */}
                        <div className="w-[210px] h-[210px] overflow-hidden shadow-lg select-none">
                            <img
                                src={currentPerson.artwork1?.image || currentPerson.artwork1}
                                alt={`${currentPerson.name} artwork 1`}
                                className="w-full h-full object-cover select-none pointer-events-none active:scale-[0.98] transition-transform duration-200"
                                draggable={false}
                            />
                        </div>
                    </div>

                    {/* 3. Coral Pink Divider with < > in between the two artworks (exactly matching desktop) */}
                    <div className="shrink-0 flex flex-col items-center justify-end relative" style={{ height: '210px' }}>
                        {/* Coral Pink Vertical Line */}
                        <div
                            className="w-[3px] bg-[#FD5178] pointer-events-none"
                            style={{ height: '210px' }}
                        />

                        {/* < > Navigation chevrons: < shifted left to align with artwork 1, > shifted right to align with artwork 2 */}
                        <div
                            className="absolute top-[calc(100%+16px)] left-1/2 -translate-x-1/2 flex items-center justify-between z-30 pointer-events-auto"
                            style={{
                                width: '35px',
                            }}
                        >
                            <button
                                type="button"
                                aria-label="Previous artist"
                                onClick={goPrevArtist}
                                className="p-1 -ml-0.5 text-white/80 hover:text-white transition-all duration-300 ease-out hover:scale-135 active:scale-90 cursor-pointer focus:outline-none origin-left flex items-center justify-start"
                            >
                                <svg
                                    width="9"
                                    height="14"
                                    viewBox="0 0 9 14"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="7 2 2 7 7 12" />
                                </svg>
                            </button>

                            <button
                                type="button"
                                aria-label="Next artist"
                                onClick={goNextArtist}
                                className="p-1 -mr-0.5 text-white/80 hover:text-white transition-all duration-300 ease-out hover:scale-135 active:scale-90 cursor-pointer focus:outline-none origin-right flex items-center justify-end"
                            >
                                <svg
                                    width="9"
                                    height="14"
                                    viewBox="0 0 9 14"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="2 2 7 7 2 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* 4. Artwork 2 */}
                    <div
                        className="relative shrink-0 flex flex-col justify-end cursor-pointer group"
                        style={{ width: '210px' }}
                        onClick={() => setMobileArtwork2Desc((prev) => !prev)}
                    >
                        {/* Floating Description at top of image - toggles on click */}
                        <div
                            className={`absolute bottom-full left-0 mb-2.5 w-[210px] z-20 flex flex-col gap-[2px] select-none transition-all duration-300 ease-out ${
                                mobileArtwork2Desc
                                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                                    : 'opacity-0 translate-y-2 pointer-events-none'
                            }`}
                            style={{
                                fontFamily: "'Montserrat', sans-serif",
                                color: '#FFFFFF',
                            }}
                        >
                            <p
                                className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                                style={{ fontSize: '0.72rem', fontWeight: 500, color: 'rgba(255, 255, 255, 0.95)' }}
                            >
                                {currentPerson.artwork2?.title || '“Rituals and Goats”'}
                            </p>
                            <p
                                className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                                style={{ fontSize: '0.65rem', fontWeight: 400, color: 'rgba(255, 255, 255, 0.85)' }}
                            >
                                Medium: {currentPerson.artwork2?.medium || 'Oil on Canvas'}
                            </p>
                            <p
                                className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                                style={{ fontSize: '0.65rem', fontWeight: 400, color: 'rgba(255, 255, 255, 0.85)' }}
                            >
                                Dimension: {currentPerson.artwork2?.dimension || '60 × 72 in'}
                            </p>
                            <p
                                className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                                style={{ fontSize: '0.65rem', fontWeight: 400, color: 'rgba(255, 255, 255, 0.85)' }}
                            >
                                Date: {currentPerson.artwork2?.date || '2025'}
                            </p>
                            <p
                                className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                                style={{ fontSize: '0.68rem', fontWeight: 600, color: '#FF2E4D' }}
                            >
                                {currentPerson.artwork2?.status || 'Reserved'}
                            </p>
                        </div>

                        {/* Artwork 2 Image */}
                        <div className="w-[210px] h-[210px] overflow-hidden shadow-lg select-none">
                            <img
                                src={currentPerson.artwork2?.image || currentPerson.artwork2}
                                alt={`${currentPerson.name} artwork 2`}
                                className="w-full h-full object-cover select-none pointer-events-none active:scale-[0.98] transition-transform duration-200"
                                draggable={false}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* =========================================================
                BOTTOM CONTROLS (DESKTOP): < > Artist Navigation Chevrons
                Brought closer together at the boundary seam,
                navigating between artists (David, Next Artist, etc.)
            ========================================================= */}
            <footer className="hidden md:flex relative w-full z-30 pb-[15.5vh] items-center">
                <div
                    className="flex items-center gap-1"
                    style={{
                        position: 'absolute',
                        left: '77.25%',
                        transform: 'translateX(-50%)',
                    }}
                >
                    {/* Previous Artist Button */}
                    <button
                        type="button"
                        id="person-prev"
                        aria-label="Previous artist"
                        onClick={goPrevArtist}
                        className="p-1.5 -m-1 text-white/80 hover:text-white transition-all duration-300 ease-out hover:scale-135 active:scale-90 cursor-pointer focus:outline-none origin-center"
                    >
                        <svg
                            width="9"
                            height="14"
                            viewBox="0 0 9 14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="7 2 2 7 7 12" />
                        </svg>
                    </button>

                    {/* Next Artist Button */}
                    <button
                        type="button"
                        id="person-next"
                        aria-label="Next artist"
                        onClick={goNextArtist}
                        className="p-1.5 -m-1 text-white/80 hover:text-white transition-all duration-300 ease-out hover:scale-135 active:scale-90 cursor-pointer focus:outline-none origin-center"
                    >
                        <svg
                            width="9"
                            height="14"
                            viewBox="0 0 9 14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="2 2 7 7 2 12" />
                        </svg>
                    </button>
                </div>
            </footer>
        </main>
    );
}
