import type Token from 'markdown-it/lib/token';
export declare const containerDetailsOptions: {
    validate: (params: string) => boolean;
    render: (tokens: Token[], idx: number) => string;
};
export declare const containerMessageOptions: {
    validate: (params: string) => boolean;
    render: (tokens: Token[], idx: number) => string;
};
export declare const containerLeftOptions: {
    validate: (params: string) => boolean;
    render: (tokens: Token[], idx: number) => "<div class=\"container-left\">" | "</div>\n";
};
export declare const containerRightOptions: {
    validate: (params: string) => boolean;
    render: (tokens: Token[], idx: number) => "</div>\n" | "<div class=\"container-right\">";
};
export declare const containerParentOptions: {
    validate: (params: string) => boolean;
    render: (tokens: Token[], idx: number) => "</div>\n" | "<div class=\"container-parent\">";
};
