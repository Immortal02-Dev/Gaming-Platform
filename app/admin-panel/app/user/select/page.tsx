"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface UserNode {
    userIdx: number;
    userID: string;
    nickname: string;
    roleType: string;
    roleLevel: number;
    children?: UserNode[];
    status: string;
}

const BACKEND_URL = ""; // Use relative path for proxy

function UserSelectContent() {
    const searchParams = useSearchParams();
    const onlyPartner = searchParams.get('onlyPartner') === 'true';
    const checkOne = searchParams.get('checkOne') === 'true';
    const notUserIdx = searchParams.get('notUserIdx');

    const [treeData, setTreeData] = useState<UserNode[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedNode, setSelectedNode] = useState<UserNode | null>(null);
    const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set());
    const [searchText, setSearchText] = useState("");
    const [activeTab, setActiveTab] = useState<"partner" | "user">("partner");

    useEffect(() => {
        fetchTree();
    }, []);

    const fetchTree = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BACKEND_URL}/api/admin/user/tree/list`, {
                credentials: 'include',
            });
            if (response.ok) {
                const result = await response.json();
                setTreeData(result.data);
            }
        } catch (error) {
            console.error("Failed to fetch tree:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleExpand = (nodeIdx: number) => {
        const newExpanded = new Set(expandedNodes);
        if (newExpanded.has(nodeIdx)) {
            newExpanded.delete(nodeIdx);
        } else {
            newExpanded.add(nodeIdx);
        }
        setExpandedNodes(newExpanded);
    };

    const handleSelect = (node: UserNode) => {
        setSelectedNode(node);
    };

    const handleFinish = () => {
        if (!selectedNode) {
            alert("?? ? ??? ????.");
            return;
        }
        if (window.opener && (window.opener as any).fnSelectUser) {
            (window.opener as any).fnSelectUser(
                selectedNode.userIdx.toString(),
                `${selectedNode.userID}(${selectedNode.nickname})`,
                selectedNode.roleType === 'partner' ? 1 : 0
            );
        }
        window.close();
    };

    const handleDeSelect = () => {
        if (window.opener && (window.opener as any).fnDeSelectUser) {
            (window.opener as any).fnDeSelectUser();
        }
        window.close();
    };

    // Filter nodes based on activeTab and searchText
    const filterNodes = (nodes: UserNode[]): UserNode[] => {
        const filtered: UserNode[] = [];
        for (const node of nodes) {
            // Tab filtering logic
            // In the original, the partner tree showed everything down from partners.
            // If onlyPartner is true, we only care about partners at any level.

            let matchesTab = true;
            if (onlyPartner && node.roleType !== 'partner' && activeTab === 'partner') {
                matchesTab = false;
            }

            if (notUserIdx && node.userIdx.toString() === notUserIdx) {
                continue;
            }

            if (activeTab === 'user' && node.roleType === 'partner' && (node.children?.length === 0 || !node.children)) {
                // If it's a partner with no member children, and we are on user tab, skip
                matchesTab = false;
            }

            const matchesSearch =
                node.userID.toLowerCase().includes(searchText.toLowerCase()) ||
                node.nickname.toLowerCase().includes(searchText.toLowerCase());

            const filteredChildren = filterNodes(node.children || []);

            if ((matchesTab && matchesSearch) || filteredChildren.length > 0) {
                filtered.push({ ...node, children: filteredChildren });
            }
        }
        return filtered;
    };

    // For this specific popup, we'll split the tree into partners and members manually if needed
    // or just filter the main tree.
    const processedData = filterNodes(treeData);

    const renderNode = (node: UserNode, depth: number) => {
        const isExpanded = expandedNodes.has(node.userIdx);
        const isSelected = selectedNode?.userIdx === node.userIdx;
        const hasChildren = node.children && node.children.length > 0;

        return (
            <div key={node.userIdx} className="user-node">
                <div
                    className={`d-flex align-items-center p-1 cursor-pointer rounded mb-1 node-row ${isSelected ? 'bg-primary text-white' : 'hover-bg-light'}`}
                    onClick={() => handleSelect(node)}
                    style={{ paddingLeft: `${depth * 20 + 8}px` }}
                >
                    <span
                        className="me-2 d-flex align-items-center justify-content-center"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (hasChildren) toggleExpand(node.userIdx);
                        }}
                        style={{ width: '16px', height: '16px', fontSize: '10px' }}
                    >
                        {hasChildren ? (isExpanded ? <i className="fa fa-chevron-down"></i> : <i className="fa fa-chevron-right"></i>) : <i className="fa fa-user opacity-25"></i>}
                    </span>
                    <span className={`badge ${node.roleType === 'partner' ? 'bg-danger' : 'bg-gray-500'} me-2`} style={{ fontSize: '10px' }}>
                        {node.roleType === 'partner' ? (node.roleLevel === 1 ? '???' : '??') : '??'}
                    </span>
                    <span className="fw-bold" style={{ fontSize: '13px' }}>{node.userID} ({node.nickname})</span>
                </div>
                {isExpanded && node.children && node.children.map(child => renderNode(child, depth + 1))}
            </div>
        );
    };

    return (
        <div id="app" className="app" style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            <div className="panel panel-inverse flex-grow-1 mb-0 d-flex flex-column">
                <div className="panel-heading">
                    <h4 className="panel-title"><i className="fas fa-users me-2"></i>?? ??</h4>
                </div>
                <div className="panel-body bg-gray-200 flex-grow-1 overflow-hidden d-flex flex-column">
                    <div className="row mb-3 flex-shrink-0">
                        <div className="col">
                            <div className="input-group">
                                <label className="input-group-text bg-dark text-white border-dark">??</label>
                                <input
                                    id="searchText"
                                    className="form-control"
                                    placeholder="??? ?? ??? ??"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <ul className="nav nav-pills mb-2 flex-shrink-0">
                        <li className="nav-item">
                            <a
                                href="javascript:;"
                                className={`nav-link ${activeTab === 'partner' ? 'active' : ''}`}
                                onClick={() => setActiveTab('partner')}
                            >
                                ???
                            </a>
                        </li>
                        {!onlyPartner && (
                            <li className="nav-item">
                                <a
                                    href="javascript:;"
                                    className={`nav-link ${activeTab === 'user' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('user')}
                                >
                                    ??
                                </a>
                            </li>
                        )}
                    </ul>

                    <div className="tab-content panel p-3 rounded mb-3 flex-grow-1 overflow-auto bg-white border">
                        {loading ? (
                            <div className="text-center p-5">
                                <i className="fa fa-spinner fa-spin fa-2x text-muted mb-2"></i>
                                <p className="text-muted">???? ???? ?...</p>
                            </div>
                        ) : processedData.length === 0 ? (
                            <div className="text-center p-5">
                                <p className="text-muted">?? ??? ????.</p>
                            </div>
                        ) : (
                            <div className="tree-container">
                                {processedData.map(node => renderNode(node, 0))}
                            </div>
                        )}
                    </div>

                    <div className="row flex-shrink-0">
                        <div className="col text-center">
                            <button className="btn btn-success me-2 px-4" onClick={handleFinish}>
                                <i className="fa fa-check me-2"></i>?? ??
                            </button>
                            <button className="btn btn-secondary px-4" onClick={handleDeSelect}>
                                <i className="fa-solid fa-xmark me-2"></i>?? ??
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
        .node-row:hover {
            background-color: #f8f9fa;
        }
        .tree-container {
            user-select: none;
        }
      `}</style>
        </div>
    );
}

function UserSelectPageInner() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UserSelectContent />
        </Suspense>
    );
}
export default function UserSelectPage() {
  return (
    <Suspense fallback={null}>
      <UserSelectPageInner />
    </Suspense>
  );
}
