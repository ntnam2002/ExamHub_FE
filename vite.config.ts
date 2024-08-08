import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path, { basename } from 'path'
import dynamicImport from 'vite-plugin-dynamic-import'
import fs from 'fs'

function mediapipe_workaround() {
    return {
        name: 'mediapipe_workaround',
        load(id: string) {
            const fileName = basename(id)
            if (
                fileName === 'face_detection.js' ||
                fileName === 'camera_utils.js'
            ) {
                let code = fs.readFileSync(id, 'utf-8')
                if (fileName === 'face_detection.js') {
                    code += 'exports.FaceDetection = FaceDetection;'
                } else if (fileName === 'camera_utils.js') {
                    code += 'exports.Camera = Camera;'
                }
                return { code }
            } else {
                return null
            }
        },
    }
}
// https://vitejs.dev/config/
export default defineConfig({
    define: {
        'process.env': process.env,
    },
    plugins: [
        react({
            babel: {
                plugins: ['babel-plugin-macros'],
            },
        }),
        dynamicImport(),
    ],
    assetsInclude: ['**/*.md'],
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src'),
        },
    },
    build: {
        outDir: 'build',
        rollupOptions: {
            plugins: [mediapipe_workaround()],
        },
    },
})
