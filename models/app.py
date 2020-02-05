from flask import Flask, make_response, request
import io
import csv
import h5py
import numpy as np

#app = Flask(__name__)

def traverse_datasets(hdf_file):

    def h5py_dataset_iterator(g, prefix=''):
        for key in g.keys():
            item = g[key]
            path = f'{prefix}/{key}'
            if isinstance(item, h5py.Dataset): # test for dataset
                yield (path, item)
            elif isinstance(item, h5py.Group): # test for group (go down)
                yield from h5py_dataset_iterator(item, path)

    with h5py.File(hdf_file, 'r') as f:
        for path, _ in h5py_dataset_iterator(f):
            yield path

with h5py.File('vae_mlp_mnist.h5', 'r') as f:
    for dset in traverse_datasets('vae_mlp_mnist.h5'):
        print('Path:', dset)
        print('Shape:', f[dset].shape)
        print('Data type:', f[dset].dtype)
        print(f[dset])
        print(np.array(f[dset]))
        print("======")

    # List all groups
    #print("Keys: %s" % f.keys())
    #print(list(f))
    #print(f['decoder'][:])
    #a_group_key = list(f.keys())[0]
    #data = list(f[a_group_key])
    #print(f['decoder'].shape)

    #print(data[0])



'''def transform(text_file_contents):
    return text_file_contents.replace("=", ",")

@app.route('/')
def form():
    return """
        <html>
            <body>
                <h1>Transform a file demo</h1>

                <form action="/transform" method="post" enctype="multipart/form-data">
                    <input type="file" name="data_file" />
                    <input type="submit" />
                </form>
            </body>
        </html>
    """
    
@app.route('/transform', methods=["POST"])
def transform_view():
    f = request.files['data_file']
    if not f:
        return "No file"

    stream = io.StringIO(f.stream.read().decode("UTF8"), newline=None)
    csv_input = csv.reader(stream)
    #print("file contents: ", file_contents)
    #print(type(file_contents))
    print(csv_input)
    for row in csv_input:
        print(row)

    stream.seek(0)
    result = transform(stream.read())

    response = make_response(result)
    response.headers["Content-Disposition"] = "attachment; filename=result.csv"
    return response
'''

#if __name__ == "__main__":
#    app.run()