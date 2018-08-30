try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup

setup(
    name="ServoChat",
    version="0.1",
    description="Chatbot based on Keras text generator tutorial",
    author="Jorfsson",
    author_email="jeffreychea234@gmail.com",
    packages=['chatbot'],
    license='Creative Commons Attribution-Noncommercial-Share Alike license',
    long_description=open('README.txt').read()
)
