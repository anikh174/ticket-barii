import { requireRole } from '@/lib/core/session';
import React from 'react';

const adminLayout = async({children}) => {
    await requireRole('admin')
    return children;
};

export default adminLayout;