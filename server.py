from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import parse_qs
from io import BytesIO
import os

global orders
orders = b""

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
	def do_GET(self):
		global orders
		cwd = os.getcwd()
		if(self.path == "/reset"):
			orders = b""
			write = open(cwd + '/orders.txt', 'w')
			write.write(orders.decode() + '\n')
			write.close()
		elif(self.path == "/orders"):
			write = open(cwd + '/orders.txt', 'r')
			file = write.read()
			lines2 = file.split('\n')
			response = BytesIO()
			css_file = open(cwd + "/server.css")
			css = css_file.read()
			css_file.close()
			response.write(b'<html>')
			response.write(b'<head>')
			response.write(b'<style>')
			response.write(css.encode('utf-8'))
			response.write(b'</style>')
			response.write(b'<title>Orders</title>')
			response.write(b'<meta charset="utf-8">')
			response.write(b'</head>')
			response.write(b'<body>')
			response.write(b'<header>')
			response.write(b'<img src="cafe.svg" alt="" width="200px"/>')
			response.write(b'<h1>Orders:</h1>')
			response.write(b'</header>')
			for order in lines2:
				others = parse_qs(order)
				if 'Name' in others:
					response.write(b'<h2>Name: ' + others['Name'][0].encode('utf-8') + b'</h2>')
				for key in others:
					value2 = others[key][0]
					if value2 == 'true':
						response.write(b'<h2>' + key.encode('utf-8') + b'</h2>')
			response.write(b'</body>')
			response.write(b'</html>')
			self.send_response(200)
			self.end_headers()
			self.wfile.write(response.getvalue())
		else:
			if(self.path != "/favicon.ico"):
				file = open(cwd + self.path, "rb")
				contents = file.read()
				file.close()
			else:
				contents = ""
			self.send_response(200)
			if(self.path == "/svg.svg" or self.path == "/cafe.svg" or self.path == "/rocket.svg" or self.path == "/ufo.svg" or self.path == "/tree.svg"):
				self.send_header("Content-Type", "image/svg+xml")
			self.end_headers()
			self.wfile.write(contents)

	def do_POST(self):
		global orders
		cwd = os.getcwd()
		content_length = int(self.headers['Content-Length'])
		body = self.rfile.read(content_length)
		if(self.path == "/reset"):
			orders = b""
		else:
			orders = body
			write = open(cwd + '/orders.txt', 'a')
			write.write(orders.decode() + "\n")
			write.close()
			self.send_response(200)
			self.end_headers()
			response = BytesIO()
			file = open(cwd + "/server.css")
			css = file.read()
			file.close()
			response.write(b'<html>')
			response.write(b'<head>')
			response.write(b'<style>')
			response.write(css.encode('utf-8'))
			response.write(b'</style>')
			response.write(b'<title>Orders</title>')
			response.write(b'<meta charset="utf-8">')
			response.write(b'</head>')
			response.write(b'<body>')
			response.write(b'<h1>Orders:</h1>')
			response.write(b'<h2>' + body + b'</h2>')
			response.write(b'</body>')
			response.write(b'</html>')
			print(body)

		self.wfile.write(response.getvalue())

httpd = HTTPServer(('localhost', 8099), SimpleHTTPRequestHandler)
httpd.serve_forever()
