import unittest
import text

class TestText(unittest.TestCase):  
    def test_split(self):
        print("Test case 1 start")
        t = "hello"
        n = 5
        k = 3
        shares = text.text_split(t,n,k)
        self.assertEqual(len(shares),5)
        print("Test case 1 finish")
        
    def test_combine(self):
        print("Test case 2 start")
        t = "hello"
        n = 5
        k = 3
        shares = text.text_split(t,n,k)
        result = text.text_combine(shares)
        self.assertEqual(result,t)
        print("Test case 2 finish")

    def test_split_combine_long(self):
        print("Test case 3 start")
        t = "eYg7hIT7uPEgp8L8QxcWsbgqn0BVitEJp3XWljQAaQZwWF2ORZLNHBbKBrKFTBQgTt6djR3zEyh8GWIH1JzjzU9JpD2JgBo5FOMPP9ij9MXEj2prubRZJrBMjy4wpvhwiGP3d4ly97Suip2irklXuZYPrBBREHv1sRb86eRsTPYPiqyfJl1BQtU9qxZOpaGCVVw0UMPoJRdgyEXPBnRxollYIjkswAHNVZLrJm8hFFiBMCcpEFoOROPYf4DwR4NvGD3NOkA4F7qIz5Jvq8khhYg3Z1KKYsObdXNG7u89oU0S9VIpFGXUtzBGFTTKcJAf"
        # 320 characters
        n = 5
        k = 3
        shares = text.text_split(t,n,k)
        result = text.text_combine(shares)
        self.assertEqual(result,t)
        print("Test case 3 finish")

if __name__ == '__main__':
    unittest.main()
