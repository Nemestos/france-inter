import argparse
from ast import arg
from scan import scan

parser = argparse.ArgumentParser()

parser.add_argument('-f', '--file', dest='path', type=str,
                    help='Add the file location', required=True)
parser.add_argument('-t', '--text', dest='text', type=str,
                    help='Add the text to read', required=True)
parser.add_argument('-m', '--max', dest='maxpeople', type=int,
                    help='Set the maximum people in the picture', required=True)
parser.add_argument('-l', '--language', dest='language', type=str,
                    help='Set the langage to use "fr,en,es,de". go to https://learn.microsoft.com/fr-fr/azure/cognitive-services/translator/language-support to see all languages', required=True)
parser.add_argument('-i', '--init', dest='init',
                    action='store_true', help=' For init/reinstall db')
parser.add_argument('-d', '--debug', dest='debug',
                    action='store_true', help=' debug and speak more')

args = parser.parse_args()

if __name__ == "__main__":

    if (args.debug == True):
        print('File is %r' % args.path)
        print('Text is %r' % args.text)
        print('Maximum is %r' % args.maxpeople)
        print('Language is %r' % args.language)
        print('Init is %r' % args.init)

    try:
        result = scan(args.maxpeople, args.path, args.text,
                      args.language, args.init, args.debug)
        if (result[0] != 0):
            print(
                f'\nAn error append with the exit code: {result[0]}\n\nerror:\n  {result[1]}\n')
        else:
            print(f'\n{result[1]} - {result[0]}\n')
    except:
        print('Can \'t execute. no response from main')
