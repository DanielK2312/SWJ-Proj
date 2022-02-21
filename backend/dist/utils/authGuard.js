"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isLoggedIn = (req, res, next) => {
    const basePath = req.path.split('/')[1];
    if (req.session.user) {
        next();
    }
    else if (req.path === '/pages/login.html'
        || (basePath === 'plugins')
        || (basePath === 'dist')) {
        next();
    }
    else {
        res.writeHead(302, {
            Location: '/admin/pages/login.html'
        });
        res.end();
    }
};
exports.default = isLoggedIn;
//# sourceMappingURL=authGuard.js.map