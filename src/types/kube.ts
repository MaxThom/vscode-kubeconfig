export interface KubeConfig {
    apiVersion:        string;
    clusters:          ClusterElement[];
    contexts:          ContextElement[];
    "current-context": string;
    kind:              string;
    preferences:       Preferences;
    users:             UserElement[];
}

export interface ClusterElement {
    cluster: ClusterCluster;
    name:    string;
}

export interface ClusterCluster {
    "certificate-authority-data": string;
    server:                       string;
}

export interface ContextElement {
    context: ContextContext;
    name:    string;
}

export interface ContextContext {
    cluster: string;
    user:    string;
}

export interface Preferences {
}

export interface UserElement {
    name: string;
    user: UserUser;
}

export interface UserUser {
    "client-certificate-data"?: string;
    "client-key-data"?:         string;
    token?:                     string;
}
