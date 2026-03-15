'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';

const tabs = ['Profile', 'Orders', 'Wishlist', 'Addresses', 'Password'];

const initialOrders = [
    { id: 'BZ-2026-001', date: '2026-02-25', status: 'Delivered', total: 149.99, items: 1 },
    { id: 'BZ-2026-002', date: '2026-02-20', status: 'Shipped', total: 229.98, items: 2 },
    { id: 'BZ-2026-003', date: '2026-02-15', status: 'Processing', total: 79.99, items: 1 },
];

const initialWishlist = [
    { id: 1, name: 'NIA Pro Wireless Headphones', price: 149.99, image: '/images/Whisk_85f4bb9cb254f6c81dd4df4c765b910adr.png' },
    { id: 4, name: 'MechPro 65% Mechanical Keyboard', price: 129.99, image: '/images/Whisk_f10ae1b73ba921a85f34ef61cf5405dddr.png' },
    { id: 2, name: 'Xtrike ME Gaming Mouse', price: 79.99, image: '/images/Whisk_a94fbd3fe8ebb5cac69422b57cdadc1bdr.png' },
];

const initialAddresses = [
    { id: 1, label: 'Home', isDefault: true, line1: '123 Tech Street', line2: 'San Francisco, CA 94102' },
    { id: 2, label: 'Office', isDefault: false, line1: '456 Innovation Blvd', line2: 'Palo Alto, CA 94301' },
];

// Toast component
function Toast({ message, type, onClose }) {
    if (!message) return null;
    const colors = { success: '#4ADE80', error: '#FF6B6B', info: '#60A5FA' };
    return (
        <div style={{ position: 'fixed', top: '90px', right: '24px', zIndex: 2000, background: '#1A1A1A', border: `1px solid ${colors[type] || colors.info}`, borderRadius: '12px', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.4)', animation: 'fadeInDown 0.3s ease', maxWidth: '400px' }}>
            <span style={{ color: colors[type], fontWeight: '600', fontSize: '1.1rem' }}>{type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
            <span style={{ fontSize: '0.875rem', color: '#D0D0D0' }}>{message}</span>
            <button onClick={onClose} style={{ marginLeft: '12px', color: '#808080', fontSize: '1rem', cursor: 'pointer', border: 'none', background: 'none' }}>✕</button>
        </div>
    );
}

export default function DashboardPage() {
    const { user, logout, isLoaded } = useStore();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Profile');

    // Auth Guard
    useEffect(() => {
        if (isLoaded && !user) {
            router.push('/login');
        }
    }, [user, isLoaded, router]);

    const [profile, setProfile] = useState({ 
        firstName: user?.name?.split(' ')[0] || '', 
        lastName: user?.name?.split(' ')[1] || '', 
        email: user?.email || '', 
        phone: '+1 555 123 4567' 
    });

    useEffect(() => {
        if (user) {
            setProfile(prev => ({
                ...prev,
                firstName: user.name.split(' ')[0],
                lastName: user.name.split(' ')[1] || '',
                email: user.email
            }));
        }
    }, [user]);

    const [wishlist, setWishlist] = useState(initialWishlist);
    const [addresses, setAddresses] = useState(initialAddresses);
    const [passwords, setPasswords] = useState({ current: '', newPw: '', confirm: '' });
    const [showAddAddress, setShowAddAddress] = useState(false);
    const [newAddress, setNewAddress] = useState({ label: '', line1: '', line2: '' });
    const [toast, setToast] = useState({ message: '', type: 'success' });

    if (!isLoaded || !user) return (
        <div style={{ paddingTop: '120px', textAlign: 'center', color: '#808080' }}>
            <p>Heading to secure dashboard...</p>
        </div>
    );


    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast({ message: '', type: 'success' }), 3000);
    };

    const handleSaveProfile = () => {
        if (!profile.firstName || !profile.email) { showToast('Name and email are required', 'error'); return; }
        showToast('Profile updated successfully!');
    };

    const handleRemoveWishlist = (id) => {
        const item = wishlist.find(w => w.id === id);
        setWishlist(prev => prev.filter(w => w.id !== id));
        showToast(`"${item?.name}" removed from wishlist`);
    };

    const handleAddAddress = () => {
        if (!newAddress.label || !newAddress.line1) { showToast('Please fill in all fields', 'error'); return; }
        setAddresses(prev => [...prev, { id: Date.now(), label: newAddress.label, isDefault: false, line1: newAddress.line1, line2: newAddress.line2 }]);
        setNewAddress({ label: '', line1: '', line2: '' });
        setShowAddAddress(false);
        showToast('Address added successfully!');
    };

    const handleDeleteAddress = (id) => {
        setAddresses(prev => prev.filter(a => a.id !== id));
        showToast('Address deleted');
    };

    const handleSetDefaultAddress = (id) => {
        setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
        showToast('Default address updated');
    };

    const handleUpdatePassword = () => {
        if (!passwords.current || !passwords.newPw || !passwords.confirm) { showToast('Please fill all fields', 'error'); return; }
        if (passwords.newPw !== passwords.confirm) { showToast('Passwords do not match', 'error'); return; }
        if (passwords.newPw.length < 8) { showToast('Password must be at least 8 characters', 'error'); return; }
        setPasswords({ current: '', newPw: '', confirm: '' });
        showToast('Password updated successfully!');
    };

    const containerStyle = { paddingTop: 'calc(72px + 3rem)', minHeight: '100vh', maxWidth: '1280px', margin: '0 auto', padding: 'calc(72px + 3rem) 2rem 3rem' };
    const gridStyle = { display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem', alignItems: 'start' };
    const sidebarStyle = { background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '1.5rem' };
    const avatarStyle = { width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #333 0%, #555 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '700', margin: '0 auto 12px' };
    const tabStyle = (tab) => ({ width: '100%', padding: '10px 14px', borderRadius: '10px', textAlign: 'left', fontSize: '0.875rem', fontWeight: activeTab === tab ? '600' : '400', color: activeTab === tab ? '#FFF' : '#808080', background: activeTab === tab ? 'rgba(255,255,255,0.06)' : 'transparent', cursor: 'pointer', border: 'none', transition: 'all 150ms ease' });
    const mainStyle = { background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '2rem' };
    const cardStyle = { background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1.25rem' };
    const statusStyle = (status) => ({ padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: '600', background: status === 'Delivered' ? 'rgba(74,222,128,0.15)' : status === 'Shipped' ? 'rgba(96,165,250,0.15)' : 'rgba(251,191,36,0.15)', color: status === 'Delivered' ? '#4ADE80' : status === 'Shipped' ? '#60A5FA' : '#FBB724' });
    const actionBtn = { padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#B0B0B0', cursor: 'pointer', marginRight: '6px' };
    const modalStyle = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1001, backdropFilter: 'blur(8px)' };
    const modalContent = { background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '2rem', width: '100%', maxWidth: '450px' };

    return (
        <div style={containerStyle}>
            <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />

            <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>My Dashboard</h1>
            <p style={{ color: '#808080', marginBottom: '2rem' }}>Manage your account and orders</p>

            <div style={gridStyle}>
                <aside style={sidebarStyle}>
                    <div style={{ textAlign: 'center', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '1.5rem' }}>
                        <div style={avatarStyle}>{profile.firstName[0]}{profile.lastName[0]}</div>
                        <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>{profile.firstName} {profile.lastName}</h3>
                        <p style={{ fontSize: '0.75rem', color: '#808080' }}>{profile.email}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {tabs.map(tab => (
                            <button key={tab} style={tabStyle(tab)} onClick={() => setActiveTab(tab)}>{tab}</button>
                        ))}
                        <button 
                            style={{ ...tabStyle(''), marginTop: '8px', color: '#FF6B6B', background: 'none', border: 'none' }} 
                            onClick={logout}
                        >
                            Sign Out
                        </button>
                    </div>
                </aside>

                <div style={mainStyle}>
                    {/* PROFILE */}
                    {activeTab === 'Profile' && (
                        <>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>Profile Information</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={cardStyle}><p style={{ fontSize: '0.75rem', color: '#808080', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total Orders</p><h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{initialOrders.length}</h3></div>
                                <div style={cardStyle}><p style={{ fontSize: '0.75rem', color: '#808080', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Wishlist</p><h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{wishlist.length}</h3></div>
                                <div style={cardStyle}><p style={{ fontSize: '0.75rem', color: '#808080', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Addresses</p><h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{addresses.length}</h3></div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group"><label className="form-label">First Name</label><input className="form-input" value={profile.firstName} onChange={e => setProfile(s => ({ ...s, firstName: e.target.value }))} /></div>
                                <div className="form-group"><label className="form-label">Last Name</label><input className="form-input" value={profile.lastName} onChange={e => setProfile(s => ({ ...s, lastName: e.target.value }))} /></div>
                                <div className="form-group"><label className="form-label">Email</label><input className="form-input" value={profile.email} onChange={e => setProfile(s => ({ ...s, email: e.target.value }))} /></div>
                                <div className="form-group"><label className="form-label">Phone</label><input className="form-input" value={profile.phone} onChange={e => setProfile(s => ({ ...s, phone: e.target.value }))} /></div>
                            </div>
                            <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={handleSaveProfile}>Save Changes</button>
                        </>
                    )}

                    {/* ORDERS */}
                    {activeTab === 'Orders' && (
                        <>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>Order History</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {initialOrders.map(order => (
                                    <div key={order.id} style={{ ...cardStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div>
                                            <h4 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '4px' }}>{order.id}</h4>
                                            <p style={{ fontSize: '0.75rem', color: '#808080' }}>{order.date} · {order.items} item{order.items > 1 ? 's' : ''}</p>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <span style={statusStyle(order.status)}>{order.status}</span>
                                            <span style={{ fontWeight: '600' }}>${order.total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* WISHLIST */}
                    {activeTab === 'Wishlist' && (
                        <>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>My Wishlist ({wishlist.length})</h2>
                            {wishlist.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '3rem', color: '#808080' }}>
                                    <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💔</p>
                                    <p>Your wishlist is empty</p>
                                    <Link href="/shop" className="btn btn-secondary" style={{ marginTop: '1rem', display: 'inline-flex' }}>Browse Products</Link>
                                </div>
                            ) : (
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    {wishlist.map(item => (
                                        <div key={item.id} style={{ ...cardStyle, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ width: '64px', height: '64px', borderRadius: '10px', overflow: 'hidden', background: '#0A0A0A', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <img src={item.image} alt={item.name} style={{ width: '90%', height: '90%', objectFit: 'contain' }} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <h4 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '4px' }}>{item.name}</h4>
                                                <p style={{ fontWeight: '700', marginBottom: '8px' }}>${item.price}</p>
                                                <button style={{ ...actionBtn, color: '#FF6B6B', borderColor: 'rgba(255,107,107,0.2)' }} onClick={() => handleRemoveWishlist(item.id)}>Remove</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {/* ADDRESSES */}
                    {activeTab === 'Addresses' && (
                        <>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>Saved Addresses</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                {addresses.map(addr => (
                                    <div key={addr.id} style={cardStyle}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#808080' }}>{addr.label}</span>
                                            {addr.isDefault && <span style={{ fontSize: '11px', padding: '2px 8px', background: 'rgba(74,222,128,0.15)', color: '#4ADE80', borderRadius: '999px' }}>Default</span>}
                                        </div>
                                        <p style={{ fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '12px' }}>{addr.line1}<br />{addr.line2}</p>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            {!addr.isDefault && <button style={actionBtn} onClick={() => handleSetDefaultAddress(addr.id)}>Set Default</button>}
                                            <button style={{ ...actionBtn, color: '#FF6B6B', borderColor: 'rgba(255,107,107,0.2)' }} onClick={() => handleDeleteAddress(addr.id)}>Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="btn btn-secondary" style={{ marginTop: '1rem' }} onClick={() => setShowAddAddress(true)}>+ Add New Address</button>
                        </>
                    )}

                    {/* PASSWORD */}
                    {activeTab === 'Password' && (
                        <>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>Update Password</h2>
                            <div style={{ maxWidth: '400px' }}>
                                <div className="form-group"><label className="form-label">Current Password</label><input type="password" className="form-input" placeholder="••••••••" value={passwords.current} onChange={e => setPasswords(s => ({ ...s, current: e.target.value }))} /></div>
                                <div className="form-group"><label className="form-label">New Password</label><input type="password" className="form-input" placeholder="Minimum 8 characters" value={passwords.newPw} onChange={e => setPasswords(s => ({ ...s, newPw: e.target.value }))} /></div>
                                <div className="form-group"><label className="form-label">Confirm New Password</label><input type="password" className="form-input" placeholder="Re-enter new password" value={passwords.confirm} onChange={e => setPasswords(s => ({ ...s, confirm: e.target.value }))} /></div>
                                <button className="btn btn-primary" onClick={handleUpdatePassword}>Update Password</button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* ADD ADDRESS MODAL */}
            {showAddAddress && (
                <div style={modalStyle} onClick={() => setShowAddAddress(false)}>
                    <div style={modalContent} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Add New Address</h2>
                            <button onClick={() => setShowAddAddress(false)} style={{ color: '#808080', fontSize: '1.25rem', border: 'none', background: 'none', cursor: 'pointer' }}>✕</button>
                        </div>
                        <div className="form-group"><label className="form-label">Label (e.g. Home, Office)</label><input className="form-input" placeholder="Home" value={newAddress.label} onChange={e => setNewAddress(s => ({ ...s, label: e.target.value }))} /></div>
                        <div className="form-group"><label className="form-label">Address Line 1</label><input className="form-input" placeholder="123 Street Name" value={newAddress.line1} onChange={e => setNewAddress(s => ({ ...s, line1: e.target.value }))} /></div>
                        <div className="form-group"><label className="form-label">City, State, ZIP</label><input className="form-input" placeholder="City, ST 00000" value={newAddress.line2} onChange={e => setNewAddress(s => ({ ...s, line2: e.target.value }))} /></div>
                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                            <button className="btn btn-secondary" onClick={() => setShowAddAddress(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleAddAddress}>Save Address</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
