import React from 'react';
import { HelpCircle, MessageCircle, FileText, Mail } from 'lucide-react';

export default function Support() {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-gray-900">帮助支持</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <MessageCircle className="h-5 w-5 text-indigo-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">在线客服</h3>
          </div>
          <p className="text-gray-500 mb-4">
            通过在线聊天获得客服团队的即时帮助
          </p>
          <button className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100">
            开始聊天
          </button>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Mail className="h-5 w-5 text-indigo-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">邮件支持</h3>
          </div>
          <p className="text-gray-500 mb-4">
            发送邮件给我们，我们将在24小时内回复
          </p>
          <button className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100">
            发送邮件
          </button>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <FileText className="h-5 w-5 text-indigo-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">使用文档</h3>
          </div>
          <p className="text-gray-500 mb-4">
            浏览我们的使用指南和帮助文档
          </p>
          <button className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100">
            查看文档
          </button>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <HelpCircle className="h-5 w-5 text-indigo-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">常见问题</h3>
          </div>
          <p className="text-gray-500 mb-4">
            查找常见问题的解答
          </p>
          <button className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100">
            查看问题
          </button>
        </div>
      </div>
    </div>
  );
}