﻿// <auto-generated />
using System;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API.Data.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20210127183516_EmployeesDependents")]
    partial class EmployeesDependents
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.0-rc.2.20475.6");

            modelBuilder.Entity("API.Entities.AppUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("Created")
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsActive")
                        .HasColumnType("INTEGER");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("BLOB");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("BLOB");

                    b.Property<string>("UserName")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("User");
                });

            modelBuilder.Entity("API.Entities.Class", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClassName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("ClassNumber")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ClassWaitingPeriod")
                        .HasColumnType("INTEGER");

                    b.Property<int>("CompanyId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsHsaClass")
                        .HasColumnType("INTEGER");

                    b.Property<double>("PersonalHealthMaximum")
                        .HasColumnType("REAL");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.ToTable("Class");
                });

            modelBuilder.Entity("API.Entities.Company", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CommencementDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("CompanyName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("GroupTerminationDate")
                        .HasColumnType("TEXT");

                    b.Property<bool>("IncludeCostPlusClaims")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IncludeHsaClaims")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("YearEndDate")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Company");
                });

            modelBuilder.Entity("API.Entities.CompensationType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Type")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Compensation_Type");
                });

            modelBuilder.Entity("API.Entities.Country", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Country");
                });

            modelBuilder.Entity("API.Entities.Dependent", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("Birthdate")
                        .HasColumnType("TEXT");

                    b.Property<int>("DependentRelationshipTypeId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("FirstName")
                        .HasColumnType("TEXT");

                    b.Property<int>("GenderId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("LastName")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("DependentRelationshipTypeId");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("GenderId");

                    b.ToTable("Dependent");
                });

            modelBuilder.Entity("API.Entities.DependentRelationshipType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Type")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Dependent_Relationship_Type");
                });

            modelBuilder.Entity("API.Entities.Division", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("CompanyId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ContactPersonEmailAddress")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("ContactPersonFax")
                        .HasColumnType("TEXT");

                    b.Property<string>("ContactPersonName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("ContactPersonPhoneNumber")
                        .HasColumnType("TEXT");

                    b.Property<string>("ContactPersonPhoneNumberExt")
                        .HasColumnType("TEXT");

                    b.Property<string>("DivisionName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("DivisionNumber")
                        .HasColumnType("INTEGER");

                    b.Property<double>("GeneralAdminFee")
                        .HasColumnType("REAL");

                    b.Property<string>("PostalCode")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("ProvinceId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.HasIndex("ProvinceId");

                    b.ToTable("Division");
                });

            modelBuilder.Entity("API.Entities.Employee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Address")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Birthdate")
                        .HasColumnType("TEXT");

                    b.Property<bool>("COB")
                        .HasColumnType("INTEGER");

                    b.Property<string>("City")
                        .HasColumnType("TEXT");

                    b.Property<int>("ClassId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("CompanyId")
                        .HasColumnType("INTEGER");

                    b.Property<double>("Compensation")
                        .HasColumnType("REAL");

                    b.Property<int>("CompensationTypeId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("CountryId")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("DependentCoverage")
                        .HasColumnType("INTEGER");

                    b.Property<int>("DivisionId")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("EFT")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("EligibilityDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("EmailAddress")
                        .HasColumnType("TEXT");

                    b.Property<string>("EmployeeNumber")
                        .HasColumnType("TEXT");

                    b.Property<bool>("Evidence")
                        .HasColumnType("INTEGER");

                    b.Property<string>("FirstName")
                        .HasColumnType("TEXT");

                    b.Property<int>("GenderId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("HireDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("InsuranceCompany")
                        .HasColumnType("TEXT");

                    b.Property<string>("LastName")
                        .HasColumnType("TEXT");

                    b.Property<bool>("MailCompany")
                        .HasColumnType("INTEGER");

                    b.Property<int>("MaritalStatusId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("MiddleName")
                        .HasColumnType("TEXT");

                    b.Property<string>("Occupation")
                        .HasColumnType("TEXT");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("TEXT");

                    b.Property<string>("PolicyNumber")
                        .HasColumnType("TEXT");

                    b.Property<string>("PostalCode")
                        .HasColumnType("TEXT");

                    b.Property<int>("ProvinceId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SIN")
                        .HasColumnType("TEXT");

                    b.Property<bool>("Smoker")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("TerminationDate")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("ClassId");

                    b.HasIndex("CompanyId");

                    b.HasIndex("CompensationTypeId");

                    b.HasIndex("CountryId");

                    b.HasIndex("DivisionId");

                    b.HasIndex("GenderId");

                    b.HasIndex("MaritalStatusId");

                    b.HasIndex("ProvinceId");

                    b.ToTable("Employee");
                });

            modelBuilder.Entity("API.Entities.FederalTax", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<double>("TaxPercentage")
                        .HasColumnType("REAL");

                    b.Property<int>("TaxTypeId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("TaxTypeId");

                    b.ToTable("Federal_Tax");
                });

            modelBuilder.Entity("API.Entities.Gender", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Type")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Gender");
                });

            modelBuilder.Entity("API.Entities.MaritalStatus", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Type")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Marital_Status");
                });

            modelBuilder.Entity("API.Entities.Province", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<double>("TaxPercentage")
                        .HasColumnType("REAL");

                    b.Property<int>("TaxTypeId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("TaxTypeId");

                    b.ToTable("Province");
                });

            modelBuilder.Entity("API.Entities.TaxType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Type")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Tax_Type");
                });

            modelBuilder.Entity("API.Entities.Class", b =>
                {
                    b.HasOne("API.Entities.Company", "Company")
                        .WithMany("Classes")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");
                });

            modelBuilder.Entity("API.Entities.Dependent", b =>
                {
                    b.HasOne("API.Entities.DependentRelationshipType", "DependentRelationshipType")
                        .WithMany("Dependents")
                        .HasForeignKey("DependentRelationshipTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Entities.Employee", "Employee")
                        .WithMany("Dependents")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Entities.Gender", "Gender")
                        .WithMany("Dependents")
                        .HasForeignKey("GenderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("DependentRelationshipType");

                    b.Navigation("Employee");

                    b.Navigation("Gender");
                });

            modelBuilder.Entity("API.Entities.Division", b =>
                {
                    b.HasOne("API.Entities.Company", "Company")
                        .WithMany("Divisions")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Entities.Province", "Province")
                        .WithMany("Divisions")
                        .HasForeignKey("ProvinceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");

                    b.Navigation("Province");
                });

            modelBuilder.Entity("API.Entities.Employee", b =>
                {
                    b.HasOne("API.Entities.Class", "Class")
                        .WithMany("Employees")
                        .HasForeignKey("ClassId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Entities.Company", "Company")
                        .WithMany("Employees")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Entities.CompensationType", "CompensationType")
                        .WithMany("Employees")
                        .HasForeignKey("CompensationTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Entities.Country", "Country")
                        .WithMany("Employees")
                        .HasForeignKey("CountryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Entities.Division", "Division")
                        .WithMany("Employees")
                        .HasForeignKey("DivisionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Entities.Gender", "Gender")
                        .WithMany("Employees")
                        .HasForeignKey("GenderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Entities.MaritalStatus", "MaritalStatus")
                        .WithMany("Employees")
                        .HasForeignKey("MaritalStatusId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Entities.Province", "Province")
                        .WithMany("Employees")
                        .HasForeignKey("ProvinceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Class");

                    b.Navigation("Company");

                    b.Navigation("CompensationType");

                    b.Navigation("Country");

                    b.Navigation("Division");

                    b.Navigation("Gender");

                    b.Navigation("MaritalStatus");

                    b.Navigation("Province");
                });

            modelBuilder.Entity("API.Entities.FederalTax", b =>
                {
                    b.HasOne("API.Entities.TaxType", "TaxType")
                        .WithMany("FederalTaxes")
                        .HasForeignKey("TaxTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TaxType");
                });

            modelBuilder.Entity("API.Entities.Province", b =>
                {
                    b.HasOne("API.Entities.TaxType", "TaxType")
                        .WithMany("Provinces")
                        .HasForeignKey("TaxTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TaxType");
                });

            modelBuilder.Entity("API.Entities.Class", b =>
                {
                    b.Navigation("Employees");
                });

            modelBuilder.Entity("API.Entities.Company", b =>
                {
                    b.Navigation("Classes");

                    b.Navigation("Divisions");

                    b.Navigation("Employees");
                });

            modelBuilder.Entity("API.Entities.CompensationType", b =>
                {
                    b.Navigation("Employees");
                });

            modelBuilder.Entity("API.Entities.Country", b =>
                {
                    b.Navigation("Employees");
                });

            modelBuilder.Entity("API.Entities.DependentRelationshipType", b =>
                {
                    b.Navigation("Dependents");
                });

            modelBuilder.Entity("API.Entities.Division", b =>
                {
                    b.Navigation("Employees");
                });

            modelBuilder.Entity("API.Entities.Employee", b =>
                {
                    b.Navigation("Dependents");
                });

            modelBuilder.Entity("API.Entities.Gender", b =>
                {
                    b.Navigation("Dependents");

                    b.Navigation("Employees");
                });

            modelBuilder.Entity("API.Entities.MaritalStatus", b =>
                {
                    b.Navigation("Employees");
                });

            modelBuilder.Entity("API.Entities.Province", b =>
                {
                    b.Navigation("Divisions");

                    b.Navigation("Employees");
                });

            modelBuilder.Entity("API.Entities.TaxType", b =>
                {
                    b.Navigation("FederalTaxes");

                    b.Navigation("Provinces");
                });
#pragma warning restore 612, 618
        }
    }
}
