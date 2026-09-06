# Dev server for the portfolio.
#
# Same as `python -m http.server`, with one difference: it tells the browser not
# to cache anything. Plain http.server sends no cache headers at all, so browsers
# fall back to heuristic caching and keep serving an old projects-data.js /
# skills-data.js / contact-data.js from memory — your edits then don't show up
# until a hard refresh (Ctrl+Shift+R), which is easy to forget and looks like
# "my change did nothing".
#
#   python serve.py          -> http://localhost:5173
#   python serve.py 8080     -> http://localhost:8080

import http.server
import socketserver
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 5173


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, fmt, *args):
        # Keep 404s and errors, drop the successful-request spam.
        if args and str(args[1]).startswith(('4', '5')):
            super().log_message(fmt, *args)


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


if __name__ == '__main__':
    with Server(('', PORT), NoCacheHandler) as httpd:
        # ASCII only: the Windows console is cp1252 and dies on fancy glyphs.
        print(f'portfolio dev server on http://localhost:{PORT}  (no-cache)')
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
