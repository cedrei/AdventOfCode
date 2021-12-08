delete                  :: Eq a => a -> [a] -> [a]
delete                  =  deleteBy (==)

deleteBy                :: (a -> a -> Bool) -> a -> [a] -> [a]
deleteBy eq x []        = []
deleteBy eq x (y:ys)    = if x `eq` y then ys else y : deleteBy eq x ys

permutations :: Eq a => [a] -> [[a]]
permutations [] = [[]]
permutations as = do a <- as
                     let l = delete a as
                     ls <- permutations l
                     return $ a : ls

isValid :: [(Int, Int)] -> Int -> Bool
isValid [] _ = True
isValid [x] _ = True
isValid (x:xs) n = (fst x == n || snd x == n) && isValid xs otherN
    where otherN = if fst x == n
                        then snd x
                        else fst x

foldFunc :: [(Int, Int)] -> [[(Int, Int)]] -> [[(Int, Int)]]
foldFunc xs validList = if isValid xs 0
                    then xs:validList
                    else validList

getValidPaths :: [[(Int, Int)]] -> [[(Int, Int)]]
getValidPaths = foldr foldFunc []

main :: IO ()
main = let paths = [(0,1),(0,3),(0,4),(1,2),(1,3),(1,4),(2,3),(3,4)]
           allPermutations = permutations paths
       in print $ getValidPaths allPermutations