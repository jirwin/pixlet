"""
Applet: Test App
Summary: For Testing
Description: It's an app for testing.
Author: Test Dev
"""

load("a_subdirectory/hi.jpg", hi_jpeg = "file")
load("render.star", "render")
load("schema.star", "schema")
load("test.txt", test_txt = "file")

DEFAULT_WHO = "world"

TEST_TXT_CONTENT = test_txt.readall()

HI_JPEG_BYTES = hi_jpeg.readall("rb")

def main(config):
    who = config.str("who", DEFAULT_WHO)
    message = "Hello, {}!".format(who)
    return render.Root(
        child = render.Text(message),
    )

def get_schema():
    return schema.Schema(
        version = "1",
        fields = [
            schema.Text(
                id = "who",
                name = "Who?",
                desc = "Who to say hello to.",
                icon = "user",
            ),
        ],
    )
