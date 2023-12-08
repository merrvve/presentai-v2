import camelot

def extract_tables(filename):
	tables = camelot.read_pdf('foo.pdf')
	tables.export('foo.json', f='json')
	print(tables)
	return True