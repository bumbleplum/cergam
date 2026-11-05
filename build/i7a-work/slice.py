import sys
from PIL import Image
src,pre,seg=sys.argv[1],sys.argv[2],int(sys.argv[3])
im=Image.open(src);w,h=im.size;n=0
for y in range(0,h,seg):
    im.crop((0,y,w,min(h,y+seg))).save(f"{pre}-{n}.png");n+=1
print(n)
