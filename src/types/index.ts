// Enums
export enum CommonFilter {
    ALL = 'all',
}

export enum TrainingStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected'
}

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
}

export enum Region {
    BAC = 'bac',
    TRUNG = 'trung',
    NAM = 'nam'
}

// Interfaces
export interface User {
    id: number
    phone: string
    isAdmin: boolean
    age?: number
    gender?: Gender
    region?: Region
    createdAt: Date
    updatedAt: Date
}

export interface AudioTrainingFile {
    id: number
    userId: number
    filePath: string
    contentVietnamese?: string
    contentKorean?: string
    trainingStatus: TrainingStatus
    createdAt: Date
    updatedAt: Date
    user?: User
}

export interface ApiResponse<T = any> {
    success: boolean
    data: T | null
    message: string | null
    error: string | null
}

export interface LoginRequest {
    phone: string
    password: string
}

export interface RegisterRequest {
    phone: string
    password: string
    age?: number
    gender?: Gender
    region?: Region
}

export interface UpdateProfileRequest {
    age?: number
    gender?: Gender
    region?: Region
}

export interface UploadTrainingFileRequest {
    file: File
    contentVietnamese?: string
    contentKorean?: string
}

export interface DashboardStats {
    totalUsers: number
    totalFiles: number
    pendingFiles: number
    approvedFiles: number
    rejectedFiles: number
    todayUploads: number
}