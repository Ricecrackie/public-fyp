import unittest
import shamir

class TestShamir(unittest.TestCase):  
    def test_add(self):
        result = shamir.add(10, 6)
        self.assertEqual(result, 12)
        
    def test_subtract(self):
        result = shamir.sub(10, 6)
        self.assertEqual(result, 12)
        
    def test_mul_normal(self):
        result = shamir.mul(4, 2)
        self.assertEqual(result, 8)

    def test_mul_boundary(self):
        result = shamir.mul(255, 2)
        self.assertEqual(result, 229)

    def test_div_normal(self):
        result = shamir.div(8, 2)
        self.assertEqual(result, 4)

    def test_div_boundary(self):
        result = shamir.div(255, 2)
        self.assertEqual(result, 242)

    def test_split_combine(self):
        n = 5
        k = 3
        s = 64
        shares = shamir.split(s,n,k)
        result = shamir.combine(k, shares[0:k])
        self.assertEqual(s,result)

if __name__ == '__main__':
    unittest.main()
