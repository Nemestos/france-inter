import argparse


parser = argparse.ArgumentParser()

parser.add_argument(
    "--max_persons", help="the maximum persons allowed", required=True)
parser.add_argument(
    "--text", help="the text to generate if curr > max", required=True)
parser.add_argument(
    "--image", help="le path de l'image à analyser", required=True)

args = parser.parse_args()

print("les arguments sont ", args)
