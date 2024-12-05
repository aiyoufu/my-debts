import React from 'react';
import { Bell, Lock, User } from 'lucide-react';
import PaymentPeriodManager from './PaymentPeriodManager';

export default function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">系统设置</h1>

      <PaymentPeriodManager />

      <div className="bg-white shadow-sm rounded-lg">
        <div className="p-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <User className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">账户设置</h3>
                <p className="mt-1 text-sm text-gray-500">
                  管理您的账户信息和偏好设置
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Bell className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">通知设置</h3>
                <p className="mt-1 text-sm text-gray-500">
                  配置提醒和通知方式
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Lock className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">安全设置</h3>
                <p className="mt-1 text-sm text-gray-500">
                  更新密码和安全选项
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}