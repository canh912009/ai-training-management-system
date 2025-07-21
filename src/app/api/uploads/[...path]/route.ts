import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export async function GET(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    try {
        const filePath = params.path.join('/')
        const uploadDir = process.env.UPLOAD_DIR
        
        if (!uploadDir) {
            console.error('UPLOAD_DIR not set')
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            )
        }

        const fullPath = path.join(uploadDir, filePath)

        console.log('UPLOAD_DIR:', uploadDir)
        console.log('Requested file:', filePath)
        console.log('Full path:', fullPath)
        console.log('File exists:', existsSync(fullPath))

        if (!existsSync(fullPath)) {
            return NextResponse.json(
                { error: `File not found: ${fullPath}` },
                { status: 404 }
            )
        }

        const fileBuffer = await readFile(fullPath)
        const ext = path.extname(fullPath).toLowerCase()
        
        let contentType = 'application/octet-stream'
        if (ext === '.mp3') contentType = 'audio/mpeg'
        if (ext === '.wav') contentType = 'audio/wav'
        if (ext === '.m4a') contentType = 'audio/mp4'
        if (ext === '.aac') contentType = 'audio/aac'

        return new Response(fileBuffer, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000',
                'Accept-Ranges': 'bytes',
            },
        })

    } catch (error) {
        console.error('File serve error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}