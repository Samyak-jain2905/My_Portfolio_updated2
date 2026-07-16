package com.portfolio.backend.repository;
import com.portfolio.backend.entity.PortfolioInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PortfolioInfoRepository extends JpaRepository<PortfolioInfo, Long> {
}
