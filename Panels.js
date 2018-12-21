class Panels{
    constructor(root)
    {
        this.root = root;
    
    }
show()
    {
    }
remove(root)
    {
        while (root.firstElementChild)
        {
            root.firstElementChild.remove();
        }
    }
}