import whois
from datetime import datetime

def check_domain_age(url: str) -> dict:
    """
    Checks how old a domain is
    """
    try:
        domain = url.replace("https://", "").replace("http://", "").split("/")[0]
        data = whois.whois(domain)

        creation_date = data.creation_date
        if isinstance(creation_date, list):
            creation_date = creation_date[0]

        age_days = (datetime.now() - creation_date).days

        return {
            "domain": domain,
            "age_days": age_days,
            "trusted": age_days > 365
        }

    except Exception as e:
        return {
            "error": str(e),
            "trusted": False
        }

