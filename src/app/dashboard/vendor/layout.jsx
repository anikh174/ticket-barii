import { requireRole } from '@/lib/core/session';
import React from 'react';

const vendorLayout = async({children}) => {
    await requireRole('vendor')
    return children;
};

export default vendorLayout;