import React from 'react';

const UserManagePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-600">Manage your application users here.</p>
        </header>

        {/* Content Area */}
        <main className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center py-10">
            <p className="text-lg text-gray-500">
              This page is not working perfectly!
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserManagePage;