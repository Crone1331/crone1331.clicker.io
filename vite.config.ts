import {defineConfig} from 'vite';

export default defineConfig(
    {
        base: './',
        server: {
            host: true,
            port: 8080,
            cors: true,
        },
        esbuild: {
            tsconfigRaw: {
                compilerOptions: {
                    experimentalDecorators: true,
                },
            },
        },
        build: {
            commonjsOptions: {
                ignoreDynamicRequires: true,
            },
            rollupOptions: {
                output: {
                    manualChunks: {
                        'vendor/pixi': ['pixi.js'],
                        'vendor/gsap': ['gsap'],
                    },
                },
            },
        },
        optimizeDeps: {
            esbuildOptions: {
                tsconfig: 'tsconfig.json',
            },
        },
    },
);

