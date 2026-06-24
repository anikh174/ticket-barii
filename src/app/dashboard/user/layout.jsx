import { requireRole } from '@/lib/core/session';
import React from 'react';

const userLayout = async({children}) => {
    await requireRole('user')
    return children;
};

export default userLayout;