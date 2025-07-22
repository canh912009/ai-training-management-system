import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { generateToken, createApiResponse } from '@/lib/auth'

interface LoginUserRequest {
    phone: string
    age?: number
    gender?: string
    region?: string
}

export async function POST(request: NextRequest) {
    try {
        const body: LoginUserRequest = await request.json()
        const { phone, age, gender, region } = body

        // Validation
        if (!phone) {
            return NextResponse.json(
                createApiResponse(false, null, null, 'Số điện thoại là bắt buộc'),
                { status: 400 }
            )
        }

        // Find user
        const user = await db.user.findUnique({
            where: { phone }
        })

        if (!user) {
            return NextResponse.json(
                createApiResponse(false, null, null, 'Số điện thoại không tồn tại'),
                { status: 401 }
            )
        }

        // Update user profile if additional info provided
        let updatedUser = user
        if (age || gender || region) {
            updatedUser = await db.user.update({
                where: { id: user.id },
                data: {
                    ...(age && { age }),
                    ...(gender && { gender }),
                    ...(region && { region }),
                },
            })
        }

        // Generate token
        const token = generateToken({
            userId: updatedUser.id,
            phone: updatedUser.phone,
            isAdmin: updatedUser.isAdmin,
            age: updatedUser.age || undefined,
            gender: updatedUser.gender || undefined,
            region: updatedUser.region || undefined,
        })

        const userData = {
            id: updatedUser.id,
            phone: updatedUser.phone,
            isAdmin: updatedUser.isAdmin,
            age: updatedUser.age,
            gender: updatedUser.gender,
            region: updatedUser.region,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
        }

        return NextResponse.json(
            createApiResponse(true, { user: userData, token }, 'Đăng nhập thành công'),
            { status: 200 }
        )

    } catch (error) {
        console.error('LoginUser error:', error)
        return NextResponse.json(
            createApiResponse(false, null, null, 'Lỗi hệ thống'),
            { status: 500 }
        )
    }
}