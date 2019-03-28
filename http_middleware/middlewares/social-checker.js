export default function socialChecker(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/auth');
    }
}
