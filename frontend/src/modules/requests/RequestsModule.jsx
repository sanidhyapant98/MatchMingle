import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchConnectionRequests,
  reviewConnectionRequest,
} from '../../store/requestsSlice';
import { Check, X, Inbox } from 'lucide-react';

export default function RequestsModule() {
  const dispatch = useDispatch();
  const { received, isLoading } = useSelector((state) => state.requests);
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    dispatch(fetchConnectionRequests());
  }, [dispatch]);

  const handleAccept = async (requestId) => {
    setActionLoading((prev) => ({ ...prev, [requestId]: 'accepting' }));
    try {
      await dispatch(reviewConnectionRequest({ requestId, status: 'accepted' })).unwrap();
    } catch (error) {
      console.error('Failed to accept request:', error);
    } finally {
      setActionLoading((prev) => {
        const newState = { ...prev };
        delete newState[requestId];
        return newState;
      });
    }
  };

  const handleReject = async (requestId) => {
    setActionLoading((prev) => ({ ...prev, [requestId]: 'rejecting' }));
    try {
      await dispatch(reviewConnectionRequest({ requestId, status: 'rejected' })).unwrap();
    } catch (error) {
      console.error('Failed to reject request:', error);
    } finally {
      setActionLoading((prev) => {
        const newState = { ...prev };
        delete newState[requestId];
        return newState;
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading requests...</p>
        </div>
      </div>
    );
  }

  if (received.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Inbox className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No requests yet</h2>
          <p className="text-gray-600">When someone is interested, you'll see them here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Connection Requests</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {received.map((request) => (
            <div
              key={request._id}
              className="card bg-white shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Avatar placeholder */}
              <div className="w-full h-48 bg-gradient-to-br from-primary-200 to-pink-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                {request.fromUserId?.profileUrl ? (
                  <img
                    src={request.fromUserId.profileUrl}
                    alt={request.fromUserId.firstName || 'User'}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-4xl">👤</div>
                )}
              </div>

              {/* User info */}
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {request.fromUserId?.firstName || 'Unknown'} {request.fromUserId?.lastName || ''}
              </h2>

              {/* Action buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleReject(request._id)}
                  disabled={!!actionLoading[request._id]}
                  className="flex-1 btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {actionLoading[request._id] === 'rejecting' ? (
                    <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <X className="w-5 h-5" />
                  )}
                  <span>Reject</span>
                </button>
                <button
                  onClick={() => handleAccept(request._id)}
                  disabled={!!actionLoading[request._id]}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {actionLoading[request._id] === 'accepting' ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Check className="w-5 h-5" />
                  )}
                  <span>Accept</span>
                </button>
              </div>

              {/* Timestamp */}
              <p className="text-xs text-gray-500 mt-3 text-center">
                {new Date(request.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}