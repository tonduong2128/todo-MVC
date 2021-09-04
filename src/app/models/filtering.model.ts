export interface FilterButton { // sử dụng interface chỉ là cái khuôn không thay đổi
    type: Filter; 
    label: string;
    isActive: boolean;  
}

export enum Filter{ //tạo kểu dữ liệu giống struct
    All,
    Active,
    Completed,
} 