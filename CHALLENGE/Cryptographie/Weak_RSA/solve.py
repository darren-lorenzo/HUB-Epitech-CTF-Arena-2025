from Crypto.Util.number import long_to_bytes, inverse
import sympy

# Valeurs corrigées : n est suffisamment grand
n = 857504083339712752489993810777
e = 17
c = 343226827320193406032113137467

# Factoriser n (il est petit, donc rapide)
factors = list(sympy.factorint(n).keys())
p, q = factors[0], factors[1]
phi = (p - 1) * (q - 1)

# Calculer la clé privée d
d = inverse(e, phi)

# Déchiffrement du message
m = pow(c, d, n)
print(long_to_bytes(m))
